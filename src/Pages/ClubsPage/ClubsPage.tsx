import React, { useEffect, useState } from "react";
import ClubList from "../../Components/ClubsList/ClubList";
import axios from "axios";
import { League } from "../../Helpers/EnumTypes";
import { toast } from "react-toastify";

type Props = {};

const options = Object.values(League).filter(
  (value) => isNaN(Number(value)) === true
);

const ClubsPage = (props: Props) => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [countries, setCountries] = useState<any>([]);
  useEffect(() => {
    const getClubsInit = async () => {
      document.title = "Football App - Clubs";
      const data = await axios.get<any[]>(`https://localhost:7019/api/club`);
      setClubs(data.data);
      const countries = await axios.get<any>(
        `https://localhost:7019/api/country/`
      );
      console.log(countries);
      setCountries(countries.data);
      setError(false);
    };
    try {
      getClubsInit();
    } catch (err) {
      setError(true);
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
    console.log("Name: ", name);
    console.log("Country: ", country);
    console.log("League: ", league);
    console.log("sortBy: ", sortBy);
    console.log(e.target.descending.value);
    // console.log(
    //   `https://localhost:7019/api/club?name=${name}&country=${country}&league=${league}&sortBy=${sortBy}&isDescending=${isDescending}`
    // );
    console.log(
      `https://localhost:7019/api/club?name=${name}&countryName=${country}&sortBy=${sortBy}&isDescending=${isDescending}${
        league !== null ? "&" + league : ""
      }`
    );
    const filteredClubs = await axios.get<any[]>(
      `https://localhost:7019/api/club?name=${name}&countryName=${country}&sortBy=${sortBy}&isDescending=${isDescending}${
        league !== null ? "&league=" + league : ""
      }`
    );
    if (!filteredClubs.data || filteredClubs.data.length === 0) {
      toast.error("Can't find that club in the database");
      setError(true);
      console.log(error);
      return;
    }
    setClubs(filteredClubs.data);
    setError(false);
    console.log(error);
  };
  const onCreateClub = async (e: any) => {
    e.preventDefault();
    console.log(e.target.country.value!);
    console.log(e.target.name.value);
    console.log(e.target.league.value);
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
    const allClubs = await axios({
      method: "get",
      url: `https://localhost:7019/api/club`,
      headers: { "Content-Type": "application/json" },
    });
    setClubs(allClubs.data);
  };

  const onDeleteClubHandler = async (clubs: any) => {
    setClubs(clubs);
  };
  return (
    <div>
      ClubsPage
      <form action="" onSubmit={onClubSearchSubmit}>
        <div className="formField">
          <label htmlFor="name"></label>
          <input type="text" name="name" id="name" placeholder="Club Name" />
        </div>
        <div className="formField">
          <label htmlFor="country"></label>
          <input
            type="text"
            name="country"
            id="country"
            placeholder="Country Name"
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
        <div className="formField">
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
      {countries.length !== 0 && (
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
      {error && <p>No club found in the database with that search data</p>}
      {!error && (
        <ClubList clubs={clubs} onDeleteClubHandler={onDeleteClubHandler} />
      )}
    </div>
  );
};

export default ClubsPage;
