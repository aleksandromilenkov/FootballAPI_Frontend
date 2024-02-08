import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../../Components/Spinner/Spinner";
import FootballersList from "../../Components/FootballersList/FootballersList";

type Props = {};

const ClubDetailsPage = (props: Props) => {
  const [club, setClub] = useState<any>(null);
  const { clubId } = useParams();
  useEffect(() => {
    const getClubInit = async () => {
      setClub({
        name: "Arsenal",
        league: "Premier League",
        country: "England",
        footballers: [
          { firstName: "Bukayo", lastName: "Saka", country: "England" },
          { firstName: "Cole", lastName: "Palmer", country: "England" },
        ],
      });
      document.title = "Football App - Arsenal";
    };
    getClubInit();
  }, [clubId]);
  return (
    <div>
      ClubDetailsPage
      {club ? (
        <div>
          <h1>{club.name}</h1>
          <h4>{club.league}</h4>
          <h4>{club.country}</h4>
          <FootballersList footballers={club.footballers} />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ClubDetailsPage;
