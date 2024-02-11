import React from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

type Props = {
  country: any;
};

const Country = (props: Props) => {
  return (
    <Card>
      <p>{props.country.name}</p>
      <Link to={`/countries/${props.country.id}`}>
        <div className="button">View Country</div>
      </Link>
    </Card>
  );
};

export default Country;
