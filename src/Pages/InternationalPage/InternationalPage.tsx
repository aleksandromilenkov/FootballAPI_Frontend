import { useEffect, useState } from "react";
import CountriesList from "../../Components/CountriesList/CountriesList";
import axios from "axios";

type Props = {};

const InternationalPage = (props: Props) => {
  const [countries, setCounties] = useState<any[]>([]);
  useEffect(() => {
    const getCountriesInit = async () => {
      document.title = "Football App - Countries";
      const data = await axios.get<any[]>(`https://localhost:7019/api/country`);
      console.log(data.data);
      setCounties(data.data);
    };
    getCountriesInit();
  }, []);
  return (
    <div>
      InternationalPage
      <CountriesList countries={countries} />
    </div>
  );
};

export default InternationalPage;
