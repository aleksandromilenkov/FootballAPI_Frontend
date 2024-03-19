import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../../Components/Spinner/Spinner";
import { Position } from "../../Helpers/EnumTypes";
import { toast } from "react-toastify";

type Props = {};
const options = Object.values(Position).filter(
  (value) => isNaN(Number(value)) === true
);

const FootballerDetailsPage = (props: Props) => {
  const [footballer, setFootballer] = useState<any>(null);
  const [clubs, setClubs] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const { footballerId } = useParams();
  useEffect(() => {
    const getFootballerInit = async () => {
      const data = await axios.get<any>(
        `https://localhost:7019/api/footballer/${footballerId}`
      );
      console.log(data.data);
      setFootballer(data.data);
      console.log(footballer?.country);
      document.title = "Football App - " + data.data.lastName;
      const clubs = await axios.get<any>(`https://localhost:7019/api/club`);
      setClubs(clubs.data);

      const countries = await axios.get<any>(
        `https://localhost:7019/api/country/`
      );
      setCountries(countries.data);
    };
    getFootballerInit();
  }, [footballerId]);
  const onFootballerUpdate = async (e: any) => {
    e.preventDefault();
    console.log(e.target.country.value);
    const countrySelected = await axios.get<any, any>(
      `https://localhost:7019/api/country?name=${e.target.country.value}`
    );
    const clubSelected = await axios.get<any, any>(
      `https://localhost:7019/api/club?name=${e.target.club.value}`
    );
    console.log(countrySelected.data[0].id);
    const updatedFootballer = await axios({
      method: "put",
      url: `https://localhost:7019/api/footballer/${footballerId}`,
      headers: { "Content-Type": "application/json" },
      data: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        age: e.target.age.value,
        position: Position[e.target.position.value],
        countryId: countrySelected.data[0].id,
        clubId: clubSelected.data[0].id,
      },
    });
    if (updatedFootballer.status.toString().startsWith("2")) {
      toast.success("Footballer successfully updated.");
      const data = await axios.get<any>(
        `https://localhost:7019/api/footballer/${footballerId}`
      );
      setFootballer(data.data);
    } else {
      toast.error("Can't update footballer!");
    }
  };
  return (
    <div>
      {footballer ? (
        <div>
          <form
            action=""
            className="form-container"
            onSubmit={onFootballerUpdate}
          >
            <div className="formField">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                defaultValue={footballer.firstName}
                placeholder="First Name"
              />
            </div>
            <div className="formField">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                defaultValue={footballer.lastName}
                placeholder="Last Name"
              />
            </div>
            <div className="formField">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                defaultValue={footballer.age}
                name="age"
                id="age"
                placeholder="Age"
              />
            </div>
            <div className="formField">
              <label htmlFor="position">Select Position</label>
              <select
                name="position"
                id="position"
                defaultValue={Position[footballer.position]}
              >
                {options.map((option, index) => {
                  return <option key={index}>{option}</option>;
                })}
              </select>
            </div>
            <div className="formField">
              <label htmlFor="country">Select Country</label>
              <select
                name="country"
                id="country"
                defaultValue={
                  footballer?.country?.name ? footballer?.country?.name : ""
                }
              >
                {countries.map((country, index) => {
                  return <option key={index}>{country.name}</option>;
                })}
              </select>
            </div>
            <div className="formField">
              <label htmlFor="club">Select Club</label>
              <select
                name="club"
                id="club"
                defaultValue={footballer.club.name ? footballer.club.name : ""}
              >
                {clubs.map((club, index) => {
                  return <option key={index}>{club.name}</option>;
                })}
              </select>
            </div>
            <button type="submit">Update Footballer</button>
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default FootballerDetailsPage;
