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
      <div className="button">
        <Link to={`/countries/${props.country.id}`}>View Country</Link>
      </div>
    </Card>
  );
};

export default Country;
