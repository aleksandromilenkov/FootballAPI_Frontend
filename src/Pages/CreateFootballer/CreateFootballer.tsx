import React, { useEffect, useState } from "react";
import { Position } from "../../Helpers/EnumTypes";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {};
const options = Object.values(Position).filter(
  (value) => isNaN(Number(value)) === true
);
const CreateFootballer = (props: Props) => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  useEffect(() => {
    const getClubInit = async () => {
      const data = await axios.get<any>(`https://localhost:7019/api/club`);
      setClubs(data.data);
      document.title = "Football App - Create Footballer";
      const countries = await axios.get<any>(
        `https://localhost:7019/api/country/`
      );
      setCountries(countries.data);
    };
    getClubInit();
  }, []);
  const onFootballerCreate = async (e: any) => {
    e.preventDefault();
    const countrySelected = await axios.get<any, any>(
      `https://localhost:7019/api/country?name=${e.target.country.value}`
    );
    const clubSelected = await axios.get<any, any>(
      `https://localhost:7019/api/club?name=${e.target.club.value}`
    );
    console.log(countrySelected);
    console.log(clubSelected);
    try {
      const createdFootballer = await axios({
        method: "post",
        url: `https://localhost:7019/api/footballer`,
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
      console.log(createdFootballer.status.toString());
      if (createdFootballer.status.toString().startsWith("2")) {
        toast.success("Footballer successfully created.");
        setSuccess(true);
      } else {
        toast.error("Can't create footballer!");
        setSuccess(false);
      }
      e.target.firstName.value = "";
      e.target.lastName.value = "";
      e.target.age.value = "";
      e.target.position.value = "";
      e.target.country.value = "";
      e.target.club.value = "";
    } catch (err: any) {
      toast.error("Can't create footballer!");
      setSuccess(false);
    }
  };
  return (
    <div>
      CreateFootballer
      {clubs.length !== 0 && countries.length !== 0 && !success && (
        <form action="" onSubmit={onFootballerCreate}>
          <div className="formField">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
            />
          </div>
          <div className="formField">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
            />
          </div>
          <div className="formField">
            <label htmlFor="age">Age</label>
            <input type="number" name="age" id="age" placeholder="Age" />
          </div>
          <div className="formField">
            <label htmlFor="position">Select Position</label>
            <select name="position" id="position">
              {options.map((option, index) => {
                return <option key={index}>{option}</option>;
              })}
            </select>
          </div>
          <div className="formField">
            <label htmlFor="country">Select Country</label>
            <select name="country" id="country">
              {countries.map((country, index) => {
                return (
                  <option key={index} data-uniqueid={country.id}>
                    {country.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="formField">
            <label htmlFor="club">Select Club</label>
            <select name="club" id="club">
              {clubs.map((club, index) => {
                return (
                  <option key={index} data-uniqueid={club.id}>
                    {club.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit">Create Footballer</button>
        </form>
      )}
      {success && (
        <div className="successfullyCreatedFootballer">
          <p>Footballer successfully created.</p>
        </div>
      )}
    </div>
  );
};

export default CreateFootballer;
