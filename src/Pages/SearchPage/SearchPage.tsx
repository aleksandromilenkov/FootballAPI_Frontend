import React, { useEffect, useState } from "react";
import "./SearchPage.css";
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
    setFootballers([]);
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
    setClubs([]);
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
    <div className="searchPage">
      <h1>Search it now</h1>
      <p>You can search either the clubs or the footballers.</p>
      <div className="searchBars">
        <form action="" className="searchForm" onSubmit={onClubsSearchSubmit}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Club name"
          />
          <button type="submit">Search Club</button>
        </form>
        <form
          action=""
          className="searchForm"
          onSubmit={onFootballersSearchSubmit}
        >
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Footballer last name"
          />
          <button type="submit">Search Footballer</button>
        </form>
      </div>
      <div className="searchOutput">
        {clubs.length !== 0 && <ClubList isOnSearchPage={true} clubs={clubs} />}
        {footballers.length !== 0 && (
          <FootballersList footballers={footballers} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
