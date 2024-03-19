import React from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import "./Footballer.css";

type Props = {
  footballer: any;
};

const Footballer = (props: Props) => {
  return (
    <Card>
      <div className="footballerProperty">
        <p>First Name:</p>
        <p>{props.footballer.firstName}</p>
      </div>
      <div className="footballerProperty">
        <p>Last Name:</p>
        <p>{props.footballer.lastName}</p>
      </div>
      <div className="footballerProperty">
        <p>Age: </p>
        <p>{props.footballer.age}</p>
      </div>
      <div className="footballerProperty">
        <p>Country: </p>
        <p>{props.footballer.country?.name}</p>
      </div>
      <Link to={`/footballers/${props.footballer.id}`}>
        <button className="button viewButton">View Footballer</button>
      </Link>
    </Card>
  );
};

export default Footballer;
