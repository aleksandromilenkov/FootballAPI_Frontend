import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import InternationalList from "../../Components/CountriesList/CountriesList";
import Spinner from "../../Components/Spinner/Spinner";
import FootballersList from "../../Components/FootballersList/FootballersList";
import axios from "axios";
import { Continent } from "../../Helpers/EnumTypes";

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
  return (
    <div>
      InternationalDetailsPage
      {country ? (
        <div>
          {" "}
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
