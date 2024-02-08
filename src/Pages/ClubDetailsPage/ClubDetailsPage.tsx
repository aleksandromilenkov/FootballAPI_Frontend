import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../../Components/Spinner/Spinner";

type Props = {};

const ClubDetailsPage = (props: Props) => {
  const [club, setClub] = useState<any>(null);
  const { ticker } = useParams();
  useEffect(() => {
    const getProfileInit = async () => {
      setClub({
        name: "Arsenal",
        league: "Premier League",
        country: "England",
        footballers: [
          { firstName: "Bukayo", lastName: "Saka", country: "England" },
        ],
      });
    };
    getProfileInit();
  }, [ticker]);
  return (
    <div>
      ClubDetailsPage
      {club ? (
        <div>
          <h1>{club.name}</h1>
          <h4>{club.league}</h4>
          <h4>{club.country}</h4>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ClubDetailsPage;
