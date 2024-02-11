import React from "react";
import Country from "../Country/Country";
import Spinner from "../Spinner/Spinner";

type Props = {
  countries: any[];
};

const CountriesList = (props: Props) => {
  return (
    <div>
      InternationalList
      {props.countries.length === 0 ? (
        <Spinner />
      ) : (
        <div className="displayedClubs">
          {props.countries.map((country, idx) => (
            <Country key={idx} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CountriesList;
