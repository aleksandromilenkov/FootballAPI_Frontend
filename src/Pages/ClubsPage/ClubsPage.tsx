import React, { useEffect, useState } from "react";
import ClubList from "../../Components/ClubsList/ClubList";
import axios from "axios";
import { League } from "../../Helpers/EnumTypes";
import { toast } from "react-toastify";
import "./ClubsPage.css";
import Spinner from "../../Components/Spinner/Spinner";

type Props = {};

const options = Object.values(League).filter(
  (value) => isNaN(Number(value)) === true
);

const ClubsPage = (props: Props) => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [countries, setCountries] = useState<any>([]);
  const [searchClub, setSearchClub] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getClubsInit = async () => {
      document.title = "Football App - Clubs";
      // const data = await axios.get<any[]>(`https://localhost:7019/api/club`);
      // setClubs(data.data);
      setIsLoading(true);
      const countries = await axios.get<any>(
        `https://localhost:7019/api/country/?pageSize=300`
      );
      console.log(countries);
      setCountries(countries.data);
      setIsLoading(false);
      setError(false);
    };
    try {
      setIsLoading(true);
      getClubsInit();
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  }, []);
  // const onChangeLeague = async (e: any) => {
  //   let league: string = e.target.value;
  //   if (!league.startsWith("All")) {
  //     league = League[e.target.value];
  //     console.log(league);
  //     const filteredClubs = await axios.get<any[]>(
  //       `https://localhost:7019/api/club?league=${league}`
  //     );
  //     setClubs(filteredClubs.data);
  //   } else {
  //     const filteredClubs = await axios.get<any[]>(
  //       `https://localhost:7019/api/club`
  //     );
  //     setClubs(filteredClubs.data);
  //   }
  // };
  const onClubSearchSubmit = async (e: any) => {
    e.preventDefault();
    console.log("LOADING: ", isLoading);
    setIsLoading(true);
    console.log("LOADING: ", isLoading);
    // const queryParams = {name:"", country:"", league:null|string, sortBy:null, isDescending:false};
    let name: string | null = null;
    let country: string | null = null;
    let league: string | null = null;
    let sortBy: string | null = null;
    let isDescending: boolean = e.target.descending.checked;
    if (e.target.name.value) {
      name = e.target.name.value;
    }
    if (e.target.country.value) {
      country = e.target.country.value;
    }
    if (!e.target.league.value.startsWith("All")) {
      league = League[e.target.league.value];
    }
    if (!e.target.sortBy.value.startsWith("Sort")) {
      sortBy = e.target.sortBy.value;
    }
    const filteredClubs = await axios.get<any[]>(
      `https://localhost:7019/api/club?name=${name}&countryName=${country}&sortBy=${sortBy}&isDescending=${isDescending}${
        league !== null ? "&league=" + league : ""
      }`
    );
    if (!filteredClubs.data || filteredClubs.data.length === 0) {
      toast.error("Can't find that club in the database");
      setError(true);
      setIsLoading(false);
      console.log("LOADING: ", isLoading);
      return;
    }
    setClubs(filteredClubs.data);
    setIsLoading(false);
    setError(false);
    console.log("LOADING: ", isLoading);
  };
  const onCreateClub = async (e: any) => {
    e.preventDefault();
    const countrySelected = await axios.get<any, any>(
      `https://localhost:7019/api/country?name=${e.target.country.value}`
    );
    console.log(countrySelected);
    console.log(countrySelected.data[0].id);
    const createdClub = await axios({
      method: "post",
      url: `https://localhost:7019/api/club`,
      headers: { "Content-Type": "application/json" },
      data: {
        name: e.target.name.value,
        league: League[e.target.league.value],
        countryId: countrySelected.data[0].id,
      },
    });
    console.log(createdClub);
    if (createdClub.status.toString().startsWith("2")) {
      toast.success("Club succesfully created.");
    }
    e.target.name.value = "";
    e.target.league.value = "";
    // const allClubs = await axios({
    //   method: "get",
    //   url: `https://localhost:7019/api/club`,
    //   headers: { "Content-Type": "application/json" },
    // });
    // setClubs(allClubs.data);
  };

  const onDeleteClubHandler = async (clubs: any[]) => {
    setClubs(clubs);
  };
  return (
    <div className="clubsPage">
      <div className="actions">
        {!searchClub ? (
          <>
            <p>
              Want to search for a club?
              <button onClick={() => setSearchClub(true)}>
                Search Club Here
              </button>{" "}
            </p>
          </>
        ) : (
          <>
            <p>
              Want to create a new club?{" "}
              <button onClick={() => setSearchClub(false)}>
                Create Club Here
              </button>
            </p>
          </>
        )}
      </div>
      {searchClub && (
        <form
          action=""
          className="form-container"
          onSubmit={onClubSearchSubmit}
        >
          <div className="formField">
            <label htmlFor="name">Club Name</label>
            <input type="text" name="name" id="name" placeholder="Club Name" />
          </div>
          <div className="formField">
            <label htmlFor="country">Club Country</label>
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Club Country"
            />
          </div>
          <div className="formField">
            <select name="league">
              <option>All Leagues</option>
              {options.map((option, index) => {
                return <option key={index}>{option}</option>;
              })}
            </select>
          </div>
          <div className="formField">
            <select name="sortBy">
              <option>Sort By:</option>
              <option>Name</option>
              <option>CountryName</option>
            </select>
          </div>
          <div className="formField orderByFormField">
            <label htmlFor="descending">Order by Descending</label>
            <input
              type="checkbox"
              id="descending"
              name="descending"
              defaultChecked={false}
            />
          </div>
          <button type="submit">Search Club</button>
        </form>
      )}
      {countries.length !== 0 && !searchClub && (
        <div className="createClub">
          <form action="" onSubmit={onCreateClub}>
            <div className="formField">
              <label htmlFor="name">Club Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Club Name"
              />
            </div>
            <div className="formField">
              <label htmlFor="league">Pick League</label>
              <select name="league" id="league" defaultValue={League[0]}>
                {options.map((option, index) => {
                  return <option key={index}>{option}</option>;
                })}
              </select>
            </div>
            <div className="formField">
              <label htmlFor="country">Pick Country</label>
              <select name="country" id="country" defaultValue={countries[0]}>
                {countries.map((country: any, index: number) => {
                  return <option key={index}>{country.name}</option>;
                })}
              </select>
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      )}
      {isLoading && <Spinner />}
      {error && <p>No club found in the database with that search data</p>}
      {!error && clubs && searchClub && (
        <ClubList
          isOnSearchPage={false}
          clubs={clubs}
          onDeleteClubHandler={onDeleteClubHandler}
        />
      )}
    </div>
  );
};

export default ClubsPage;
