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
      <div className="button">
        <Link to={`/clubs/${props.club.id}`}>View Club</Link>
      </div>
    </Card>
  );
};

export default Club;
