import React from "react";
import Country from "../Country/Country";

type Props = {
  countries: any[];
};

const CountriesList = (props: Props) => {
  return (
    <div>
      InternationalList
      {props.countries.length === 0 ? (
        <p>No countries found.</p>
      ) : (
        <div className="displayedClubs">
          {props.countries.map((country) => (
            <Country country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CountriesList;
