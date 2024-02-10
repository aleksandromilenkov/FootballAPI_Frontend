import React from "react";
import Footballer from "../Footballer/Footballer";
import "./FootballersList.css";

type Props = {
  footballers: any[];
};

const FootballersList = (props: Props) => {
  return (
    <div>
      FootballersList
      {props.footballers.length === 0 ? (
        <p>No footballers found.</p>
      ) : (
        <div className="displayedFootballers">
          {props.footballers.map((footballer, idx) => (
            <Footballer key={idx} footballer={footballer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FootballersList;
