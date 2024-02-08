import React from "react";
import Club from "../Club/Club";
import "./ClubList.css";

type Props = {};
const clubs = [
  { name: "Arsenal", country: "England", id: 1 },
  { name: "Chelsea", country: "England", id: 2 },
];

const ClubList = (props: Props) => {
  return (
    <div>
      ClubList
      <div className="displayedClubs">
        {clubs.map((club) => (
          <Club club={club} />
        ))}
      </div>
    </div>
  );
};

export default ClubList;
