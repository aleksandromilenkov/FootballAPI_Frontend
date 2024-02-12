import React from "react";
import Club from "../Club/Club";
import "./ClubList.css";

type Props = {
  clubs: any[];
  onDeleteClubHandler?: (clubs: any[]) => {};
};
// const clubs = [
//   { name: "Arsenal", country: "England", id: 1 },
//   { name: "Chelsea", country: "England", id: 2 },
// ];

const ClubList = (props: Props) => {
  return (
    <div>
      ClubList
      <div className="displayedClubs">
        {props.clubs.map((club, idx) => (
          <Club
            club={club}
            key={idx}
            onDeleteClubHandler={props.onDeleteClubHandler!}
          />
        ))}
      </div>
    </div>
  );
};

export default ClubList;
