import React from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Country.css";

type Props = {
  country: any;
  onDeleteCountry: (countries: any) => {};
};

const Country = (props: Props) => {
  const onDeleteCountry = async (e: any) => {
    console.log(e.target.dataset.uniqueid);
    const deletedClub = await axios({
      method: "delete",
      url: `https://localhost:7019/api/country/${e.target.dataset.uniqueid}`,
      headers: { "Content-Type": "application/json" },
    });
    console.log(deletedClub);
    const data = await axios.get<any[]>(`https://localhost:7019/api/country`);
    props.onDeleteCountry(data.data);
  };
  return (
    <Card>
      <p>{props.country.name}</p>
      <Link to={`/countries/${props.country.id}`}>
        <div className="button">View Country</div>
      </Link>
      <div
        className="button deleteButton"
        data-uniqueid={props.country.id}
        onClick={onDeleteCountry}
      >
        Delete Country
      </div>
    </Card>
  );
};

export default Country;
