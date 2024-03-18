import React from "react";
import Club from "../Club/Club";
import "./ClubList.css";

type Props = {
  clubs: any[];
  onDeleteClubHandler?: (clubs: any[]) => {};
  isOnSearchPage: boolean;
};
// const clubs = [
//   { name: "Arsenal", country: "England", id: 1 },
//   { name: "Chelsea", country: "England", id: 2 },
// ];

const ClubList = (props: Props) => {
  return (
    <div className="displayedClubs">
      {props.clubs.map((club, idx) => (
        <Club
          club={club}
          key={idx}
          isOnSearchPage={props.isOnSearchPage}
          onDeleteClubHandler={props.onDeleteClubHandler!}
        />
      ))}
    </div>
  );
};

export default ClubList;
