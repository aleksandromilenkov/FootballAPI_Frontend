import React, { useEffect, useState } from "react";
import ClubList from "../../Components/ClubsList/ClubList";
import axios from "axios";
import { League } from "../../Helpers/EnumTypes";

type Props = {};

const options = Object.values(League).filter(
  (value) => isNaN(Number(value)) === true
);

const ClubsPage = (props: Props) => {
  const [clubs, setClubs] = useState<any[]>([]);
  useEffect(() => {
    const getClubsInit = async () => {
      document.title = "Football App - Clubs";
      const data = await axios.get<any[]>(`https://localhost:7019/api/club`);
      console.log(data.data);
      setClubs(data.data);
    };
    getClubsInit();
  }, []);
  const onChangeLeague = async (e: any) => {
    let league: string = e.target.value;
    if (!league.startsWith("All")) {
      league = League[e.target.value];
      console.log(league);
      const filteredClubs = await axios.get<any[]>(
        `https://localhost:7019/api/club?league=${league}`
      );
      setClubs(filteredClubs.data);
    } else {
      const filteredClubs = await axios.get<any[]>(
        `https://localhost:7019/api/club`
      );
      setClubs(filteredClubs.data);
    }
  };
  return (
    <div>
      ClubsPage
      <select onChange={onChangeLeague}>
        <option>All Leagues</option>
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
      <ClubList clubs={clubs} />
    </div>
  );
};

export default ClubsPage;
