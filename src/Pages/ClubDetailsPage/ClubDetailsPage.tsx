import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../../Components/Spinner/Spinner";
import FootballersList from "../../Components/FootballersList/FootballersList";
import axios from "axios";
import { League } from "../../Helpers/EnumTypes";
import "./ClubDetailsPage.css";

type Props = {};
const options = Object.values(League).filter(
  (value) => isNaN(Number(value)) === true
);

const ClubDetailsPage = (props: Props) => {
  const [club, setClub] = useState<any>(null);
  const [countries, setCountries] = useState<any>(null);
  const { clubId } = useParams();
  useEffect(() => {
    const getClubInit = async () => {
      const data = await axios.get<any>(
        `https://localhost:7019/api/club/${clubId}`
      );
      console.log(data.data);
      setClub(data.data);
      document.title = "Football App - " + data.data.name;
      const countries = await axios.get<any>(
        `https://localhost:7019/api/country/?pageSize=300`
      );
      console.log(countries);
      setCountries(countries.data);
    };
    getClubInit();
  }, [clubId]);
  const onUpdateClub = async (e: any) => {
    e.preventDefault();
    console.log(e.target.country.value);
    console.log(e.target.name.value);
    console.log(e.target.league.value);
    const countrySelected = await axios.get<any, any>(
      `https://localhost:7019/api/country?name=${e.target.country.value}`
    );
    console.log(countrySelected);
    console.log(countrySelected.data[0].id);
    await axios({
      method: "put",
      url: `https://localhost:7019/api/club/${clubId}`,
      headers: { "Content-Type": "application/json" },
      data: {
        name: e.target.name.value,
        league: League[e.target.league.value],
        countryId: countrySelected.data[0].id,
      },
    });
    const updatedClub = await axios({
      method: "get",
      url: `https://localhost:7019/api/club/${clubId}`,
      headers: { "Content-Type": "application/json" },
    });
    setClub(updatedClub.data);
  };

  return (
    <div>
      {club && countries ? (
        <div>
          <div className="updateClub">
            <form action="" className="form-container" onSubmit={onUpdateClub}>
              <div className="formField">
                <label htmlFor="name">New Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={club.name}
                  required
                  placeholder="Club Name"
                />
              </div>
              <div className="formField">
                <label htmlFor="league">Pick League</label>
                <select
                  name="league"
                  id="league"
                  defaultValue={League[club.league]}
                >
                  {options.map((option, index) => {
                    return <option key={index}>{option}</option>;
                  })}
                </select>
              </div>
              <div className="formField">
                <label htmlFor="country">Pick Country</label>
                <select
                  name="country"
                  id="country"
                  defaultValue={club.country?.name}
                >
                  {countries.map((country: any, index: number) => {
                    return <option key={index}>{country.name}</option>;
                  })}
                </select>
              </div>
              <button type="submit">Update Club</button>
            </form>
          </div>
          <div className="clubInfo">
            <h1>{club.name}</h1>
            <h4>{League[club.league]}</h4>
            <h4>{club.country?.name}</h4>
            <h5>Club's players: </h5>
            <FootballersList footballers={club.footballers} />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ClubDetailsPage;
