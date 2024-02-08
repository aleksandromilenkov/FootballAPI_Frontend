import React, { useEffect } from "react";

type Props = {};

const SearchPage = (props: Props) => {
  useEffect(() => {
    document.title = "Football App - Search";
  }, []);
  return <div>SearchPage</div>;
};

export default SearchPage;
