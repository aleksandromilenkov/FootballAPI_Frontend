import React from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

type Props = {
  footballer: any;
};

const Footballer = (props: Props) => {
  return (
    <Card>
      <p>{props.footballer.firstName}</p>
      <p>{props.footballer.lastName}</p>
      <p>{props.footballer.age}</p>
      <p>{props.footballer.country?.name}</p>
      <Link to={`/footballers/${props.footballer.id}`}>
        <div className="button">View Footballer</div>
      </Link>
    </Card>
  );
};

export default Footballer;
