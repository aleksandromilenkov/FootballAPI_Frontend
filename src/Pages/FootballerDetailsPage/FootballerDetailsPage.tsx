import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../../Components/Spinner/Spinner";

type Props = {};

const FootballerDetailsPage = (props: Props) => {
  const [footballer, setFootballer] = useState<any>(null);
  const { footballerId } = useParams();
  useEffect(() => {
    const getClubInit = async () => {
      const data = await axios.get<any>(
        `https://localhost:7019/api/footballer/${footballerId}`
      );
      console.log(data.data);
      setFootballer(data.data);
      document.title = "Football App - " + data.data.lastName;
    };
    getClubInit();
  }, [footballerId]);
  return (
    <div>
      FootballerDetailsPage
      {footballer ? (
        <div>
          <h1>First Name: {footballer.firstName}</h1>
          <h1>Last Name: {footballer.lastName}</h1>
          <h1>Age: {footballer.age}</h1>
          <h4>Club: {footballer.club.name}</h4>
          <h4>Country: {footballer.country.name}</h4>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default FootballerDetailsPage;
