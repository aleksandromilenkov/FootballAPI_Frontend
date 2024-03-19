import React from "react";
import Country from "../Country/Country";
import Spinner from "../Spinner/Spinner";

type Props = {
  countries: any[];
  onDeleteCountry?: (countries: any) => {};
};

const CountriesList = (props: Props) => {
  return (
    <div>
      <div className="displayedClubs">
        {props.countries.map((country, idx) => (
          <Country
            key={idx}
            country={country}
            onDeleteCountry={props.onDeleteCountry!}
          />
        ))}
      </div>
    </div>
  );
};

export default CountriesList;
