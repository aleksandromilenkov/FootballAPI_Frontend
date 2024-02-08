import React, { useEffect } from "react";
import ClubList from "../../Components/ClubsList/ClubList";

type Props = {};

const ClubsPage = (props: Props) => {
  useEffect(() => {
    document.title = "Football App - Clubs";
  });
  return (
    <div>
      ClubsPage
      <ClubList />
    </div>
  );
};

export default ClubsPage;
