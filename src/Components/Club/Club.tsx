import React from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

type Props = {
  club: any;
};

const Club = (props: Props) => {
  return (
    <Card>
      <p>{props.club.name}</p>
      <Link to={`/clubs/${props.club.id}`}>
        <div className="button">View Club</div>
      </Link>
    </Card>
  );
};

export default Club;
