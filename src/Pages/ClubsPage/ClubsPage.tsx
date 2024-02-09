import React, { useEffect, useState } from "react";
import ClubList from "../../Components/ClubsList/ClubList";
import axios from "axios";

type Props = {};

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
  return (
    <div>
      ClubsPage
      <ClubList clubs={clubs} />
    </div>
  );
};

export default ClubsPage;
