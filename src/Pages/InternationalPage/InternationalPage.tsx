import { useEffect, useState } from "react";
import CountriesList from "../../Components/CountriesList/CountriesList";
import axios from "axios";
import { Continent } from "../../Helpers/EnumTypes";
import Spinner from "../../Components/Spinner/Spinner";
import { toast } from "react-toastify";

type Props = {};
const options = Object.values(Continent).filter(
  (value) => isNaN(Number(value)) === true
);

const InternationalPage = (props: Props) => {
  const [countries, setCountries] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getCountriesInit = async () => {
      document.title = "Football App - Countries";
      setIsLoading(true);
      const data = await axios.get<any[]>(`https://localhost:7019/api/country`);
      console.log(data.data);
      if (!data.data || data.data.length === 0) {
        setError(true);
        setIsLoading(false);
        return;
      }
      setCountries(data.data);
    };
    getCountriesInit();
    setIsLoading(false);
  }, []);
  const onCountrySearchSubmit = async (e: any) => {
    e.preventDefault();
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
    setIsLoading(true);
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
  return (
    <div>
      InternationalPage
      <form action="" onSubmit={onCountrySearchSubmit}>
        <div className="formField">
          <label htmlFor="name"></label>
          <input type="text" name="name" id="name" placeholder="Country Name" />
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
        <div className="formField">
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
      {isLoading && <Spinner />}
      {error && !isLoading && <p>No country found in the database.</p>}
      {!error && !isLoading && <CountriesList countries={countries} />}
    </div>
  );
};

export default InternationalPage;
