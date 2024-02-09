import React from "react";
import Card from "../Card/Card";

type Props = {
  footballer: any;
};

const Footballer = (props: Props) => {
  return (
    <Card>
      <p>{props.footballer.firstName}</p>
      <p>{props.footballer.lastName}</p>
      <p>{props.footballer.аge}</p>
      <p>{props.footballer.country?.name}</p>
    </Card>
  );
};

export default Footballer;
