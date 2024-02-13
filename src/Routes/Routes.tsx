import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import ClubsPage from "../Pages/ClubsPage/ClubsPage";
import InternationalPage from "../Pages/InternationalPage/InternationalPage";
import App from "../App";
import ClubDetailsPage from "../Pages/ClubDetailsPage/ClubDetailsPage";
import InternationalDetailsPage from "../Pages/InternationalDetailsPage/InternationalDetailsPage";
import FootballerDetailsPage from "../Pages/FootballerDetailsPage/FootballerDetailsPage";
import CreateFootballer from "../Pages/CreateFootballer/CreateFootballer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "clubs", element: <ClubsPage /> },
      { path: "clubs/:clubId", element: <ClubDetailsPage /> },
      { path: "countries", element: <InternationalPage /> },
      { path: "countries/:countryId", element: <InternationalDetailsPage /> },
      { path: "footballers/:footballerId", element: <FootballerDetailsPage /> },
      { path: "createFootballer", element: <CreateFootballer /> },
      // {
      //   path: "clubs/:ticker",
      //   element: <ClubsPage />,
      //   children: [
      //     { path: "company-profile", element: <CompanyProfile /> },
      //     { path: "income-statement", element: <IncomeStatement /> },
      //     { path: "balance-sheet", element: <BalanceSheet /> },
      //     { path: "cashflow-statement", element: <CashflowStatement /> },
      //   ],
      // },
    ],
  },
]);
