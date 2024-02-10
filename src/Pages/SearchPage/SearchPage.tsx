import React, { useEffect, useState } from "react";
import ClubList from "../../Components/ClubsList/ClubList";
import FootballersList from "../../Components/FootballersList/FootballersList";
import { toast } from "react-toastify";
import axios from "axios";

type Props = {};

const SearchPage = (props: Props) => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [footballers, setFootballers] = useState<any[]>([]);
  useEffect(() => {
    document.title = "Football App - Search";
  }, []);
  const onClubsSearchSubmit = async (e: any) => {
    e.preventDefault();
    const clubs = await axios.get<any[]>(
      `https://localhost:7019/api/club?name=${e.target.search.value}`
    );
    console.log(clubs.data);
    if (!clubs.data || clubs.data.length === 0) {
      toast.error(
        "Club with name " +
          e.target.search.value +
          " does not exists in the Database."
      );
      return;
    }
    setClubs(clubs.data);
  };
  const onFootballersSearchSubmit = async (e: any) => {
    e.preventDefault();
    const footballers = await axios.get<any[]>(
      `https://localhost:7019/api/footballer?lastName=${e.target.search.value}`
    );
    console.log(footballers.data);
    if (!footballers.data || footballers.data.length === 0) {
      toast.error(
        "Footballer with last name " +
          e.target.search.value +
          " does not exists in the Database."
      );
      return;
    }
    setFootballers(footballers.data);
  };
  return (
    <div>
      SearchPage
      <div className="search">
        <form action="" onSubmit={onClubsSearchSubmit}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Club name"
          />
          <button type="submit">Search Club</button>
        </form>
        <form action="" onSubmit={onFootballersSearchSubmit}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Footballer last name"
          />
          <button type="submit">Search Footballer</button>
        </form>
      </div>
      {clubs.length !== 0 && <ClubList clubs={clubs} />}
      {footballers.length !== 0 && (
        <FootballersList footballers={footballers} />
      )}
    </div>
  );
};

export default SearchPage;
