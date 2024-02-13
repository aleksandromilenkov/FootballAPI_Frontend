import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import InternationalList from "../../Components/CountriesList/CountriesList";
import Spinner from "../../Components/Spinner/Spinner";
import FootballersList from "../../Components/FootballersList/FootballersList";
import axios from "axios";
import { Continent } from "../../Helpers/EnumTypes";
const options = Object.values(Continent).filter(
  (value) => isNaN(Number(value)) === true
);
type Props = {};

const InternationalDetailsPage = (props: Props) => {
  const [country, setCountry] = useState<any>(null);
  const { countryId } = useParams();
  useEffect(() => {
    const getCountryInit = async () => {
      const data = await axios.get<any>(
        `https://localhost:7019/api/country/${countryId}`
      );
      console.log(data.data);
      setCountry(data.data);
      document.title = `FootballApp - ${data.data.name}`;
    };
    getCountryInit();
  }, [countryId]);
  const onCountryUpdate = async (e: any) => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(Continent[e.target.continent.value]);
    console.log(e.target.wcwon.value);
    const createdCountry = await axios({
      method: "put",
      url: `https://localhost:7019/api/country/${countryId}`,
      headers: { "Content-Type": "application/json" },
      data: {
        name: e.target.name.value,
        continent: Continent[e.target.continent.value],
        wcWon: +e.target.wcwon.value,
      },
    });
    console.log(createdCountry);
    const updatedCountry = await axios({
      method: "get",
      url: `https://localhost:7019/api/country/${countryId}`,
      headers: { "Content-Type": "application/json" },
    });
    setCountry(updatedCountry.data);
  };
  return (
    <div>
      InternationalDetailsPage
      {country ? (
        <div>
          <div className="createClub">
            <form action="" onSubmit={onCountryUpdate}>
              <div className="formField">
                <label htmlFor="name">New Country Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={country.name}
                  required
                  placeholder="Country Name"
                />
              </div>
              <div className="formField">
                <label htmlFor="continent">Pick Continent</label>
                <select
                  name="continent"
                  id="continent"
                  defaultValue={Continent[0]}
                >
                  {options.map((option, index) => {
                    return <option key={index}>{option}</option>;
                  })}
                </select>
              </div>
              <div className="formField">
                <label htmlFor="wcwon">World Cups Won</label>
                <select name="wcwon" id="wcwon" defaultValue={country.wcWon}>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <button type="submit">Update</button>
            </form>
          </div>{" "}
          <h4>Name: {country.name} </h4>
          <h4>Wc won:{country.wcWon}</h4>
          <h4>Continent:{Continent[country.continent]}</h4>
          <FootballersList footballers={country.footballers} />
        </div>
      ) : (
        <Spinner />
      )}
      {/* {country ? (
        <div>
            
          <h4>Wc won:{country.wcWon}</h4>
          <h4>Continent:{country.continent}</h4>
          <FootballersList footballers={country.footballers} />
        </div>
      ) : (
        <Spinner />
      )} */}
    </div>
  );
};

export default InternationalDetailsPage;
