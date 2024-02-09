import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../../Components/Spinner/Spinner";
import FootballersList from "../../Components/FootballersList/FootballersList";
import axios from "axios";
import { League } from "../../Helpers/EnumTypes";

type Props = {};

const ClubDetailsPage = (props: Props) => {
  const [club, setClub] = useState<any>(null);
  const { clubId } = useParams();
  useEffect(() => {
    const getClubInit = async () => {
      const data = await axios.get<any>(
        `https://localhost:7019/api/club/${clubId}`
      );
      console.log(data.data);
      setClub(data.data);
      document.title = "Football App - " + data.data.name;
    };
    getClubInit();
  }, [clubId]);
  return (
    <div>
      ClubDetailsPage
      {club ? (
        <div>
          <h1>{club.name}</h1>
          <h4>{League[club.league]}</h4>
          <h4>{club.country.name}</h4>
          <FootballersList footballers={club.footballers} />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ClubDetailsPage;
