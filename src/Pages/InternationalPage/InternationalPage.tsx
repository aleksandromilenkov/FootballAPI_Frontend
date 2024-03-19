import { useEffect, useState } from "react";
import CountriesList from "../../Components/CountriesList/CountriesList";
import axios from "axios";
import { Continent } from "../../Helpers/EnumTypes";
import Spinner from "../../Components/Spinner/Spinner";
import { toast } from "react-toastify";
import { count } from "console";
import "./InternationalPage.css";

type Props = {};
const options = Object.values(Continent).filter(
  (value) => isNaN(Number(value)) === true
);

const InternationalPage = (props: Props) => {
  const [countries, setCountries] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchCountry, setSearchCountry] = useState<boolean>(true);
  // useEffect(() => {
  //   const getCountriesInit = async () => {
  //     document.title = "Football App - Countries";
  //     setIsLoading(true);
  //     const data = await axios.get<any[]>(`https://localhost:7019/api/country`);
  //     console.log(data.data);
  //     if (!data.data || data.data.length === 0) {
  //       setError(true);
  //       setIsLoading(false);
  //       return;
  //     }
  //     setCountries(data.data);
  //   };
  //   getCountriesInit();
  //   setIsLoading(false);
  // }, []);
  const onCountrySearchSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    let name: string | null = null;
    let continent: string | null = null;
    let wcWon: string | null = null;
    let sortBy: string | null = null;
    let isDescending: boolean = e.target.descending.checked;
    if (e.target.name.value) {
      name = e.target.name.value;
    }
    if (!e.target.continent.value.startsWith("All")) {
      continent = Continent[e.target.continent.value];
    }
    if (!e.target.wcwon.value.startsWith("All")) {
      wcWon = e.target.wcwon.value;
    }
    if (!e.target.sortBy.value.startsWith("Sort")) {
      sortBy = e.target.sortBy.value;
    }
    const isName = `name=${name !== null ? name : null}`;
    console.log(
      `https://localhost:7019/api/country?${isName}${
        continent !== null ? "&continent=" + continent : ""
      }${wcWon !== null ? "&wcWon=" + wcWon : ""}${
        sortBy !== null ? "&sortBy=" + sortBy : ""
      }&isDescending=${isDescending}`
    );
    const filteredCountries = await axios.get<any[]>(
      `https://localhost:7019/api/country?${isName}${
        continent !== null ? "&continent=" + continent : ""
      }${wcWon !== null ? "&wcWon=" + wcWon : ""}${
        sortBy !== null ? "&sortBy=" + sortBy : ""
      }&isDescending=${isDescending}`
    );
    if (!filteredCountries.data || filteredCountries.data.length === 0) {
      toast.error("Can't find that country in the database");
      setError(true);
      console.log(error);
      setIsLoading(false);
      return;
    }
    setCountries(filteredCountries.data);
    setIsLoading(false);
    setError(false);
    console.log(error);
  };
  const onDeleteCountry = async (countries: any) => {
    setCountries(countries);
  };

  const onCreateCountry = async (e: any) => {
    e.preventDefault();
    const createdCountry = await axios({
      method: "post",
      url: `https://localhost:7019/api/country`,
      headers: { "Content-Type": "application/json" },
      data: {
        name: e.target.name.value,
        continent: Continent[e.target.continent.value],
        wcWon: e.target.wcwon.value,
      },
    });
    console.log(createdCountry);
    if (createdCountry.status.toString().startsWith("2")) {
      toast.success("Country successfully created.");
    }
    e.target.name.value = "";
    e.target.continent.value = "";
    e.target.wcwon.value = "";
    const allCountries = await axios({
      method: "get",
      url: `https://localhost:7019/api/country`,
      headers: { "Content-Type": "application/json" },
    });
    setCountries(allCountries.data);
  };
  return (
    <div className="countriesPage">
      <div className="actions">
        {!searchCountry ? (
          <>
            <p>
              Want to search for a country?
              <button onClick={() => setSearchCountry(true)}>
                Search Country Here
              </button>{" "}
            </p>
          </>
        ) : (
          <>
            <p>
              Want to create a new country?{" "}
              <button onClick={() => setSearchCountry(false)}>
                Create Country Here
              </button>
            </p>
          </>
        )}
      </div>
      {searchCountry && (
        <form
          action=""
          className="form-container"
          onSubmit={onCountrySearchSubmit}
        >
          <div className="formField">
            <label htmlFor="name"></label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Country Name"
            />
          </div>
          <div className="formField">
            <select name="continent">
              <option>All Continents</option>
              {options.map((option, index) => {
                return <option key={index}>{option}</option>;
              })}
            </select>
          </div>
          <div className="formField">
            <label htmlFor="wcwon">World Cups Won</label>
            <select name="wcwon" id="wcwon">
              <option>All Countries</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="formField">
            <select name="sortBy">
              <option>Sort By:</option>
              <option>Name</option>
              <option>WorldCupsWon</option>
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
          <button type="submit">Search Country</button>
        </form>
      )}
      {!searchCountry && (
        <form action="" className="form-container" onSubmit={onCreateCountry}>
          <div className="formField">
            <label htmlFor="name">Country Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Country Name"
            />
          </div>
          <div className="formField">
            <label htmlFor="continent">Pick Continent</label>
            <select name="continent" id="continent" defaultValue={Continent[0]}>
              {options.map((option, index) => {
                return <option key={index}>{option}</option>;
              })}
            </select>
          </div>
          <div className="formField">
            <label htmlFor="wcwon">World Cups Won</label>
            <select name="wcwon" id="wcwon" defaultValue={0}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <button type="submit">Create</button>
        </form>
      )}
      <div className="createClub"></div>
      {isLoading && <Spinner />}
      {error && !isLoading && <p>No country found in the database.</p>}
      {!error && !isLoading && searchCountry && (
        <CountriesList
          countries={countries}
          onDeleteCountry={onDeleteCountry}
        />
      )}
    </div>
  );
};

export default InternationalPage;
