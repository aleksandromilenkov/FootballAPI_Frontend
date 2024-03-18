import React from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Club.css";

type Props = {
  club: any;
  onDeleteClubHandler: (clubs: any[]) => {};
  isOnSearchPage: boolean;
};

const Club = (props: Props) => {
  const onDeleteClub = async (e: any) => {
    console.log(e.target.dataset.uniqueid);
    const deletedClub = await axios({
      method: "delete",
      url: `https://localhost:7019/api/club/${e.target.dataset.uniqueid}`,
      headers: { "Content-Type": "application/json" },
    });
    console.log(deletedClub);
    const data = await axios.get<any[]>(`https://localhost:7019/api/club`);
    await props.onDeleteClubHandler(data.data);
  };
  return (
    <Card>
      <h3>{props.club.name}</h3>
      <Link to={`/clubs/${props.club.id}`}>
        <button className="button viewButton">View Club</button>
      </Link>
      {!props.isOnSearchPage && (
        <button
          className="button deleteButton"
          onClick={onDeleteClub}
          data-uniqueid={props.club.id}
        >
          Delete Club
        </button>
      )}
    </Card>
  );
};

export default Club;
