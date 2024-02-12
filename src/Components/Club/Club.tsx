import React from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import axios from "axios";

type Props = {
  club: any;
  onDeleteClubHandler: (clubs: any[]) => {};
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
      <p>{props.club.name}</p>
      <Link to={`/clubs/${props.club.id}`}>
        <div className="button">View Club</div>
      </Link>
      <div
        className="button deleteButton"
        onClick={onDeleteClub}
        data-uniqueid={props.club.id}
      >
        Delete Club
      </div>
    </Card>
  );
};

export default Club;
