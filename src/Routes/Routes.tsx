import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import ClubsPage from "../Pages/ClubsPage/ClubsPage";
import InternationalPage from "../Pages/InternationalPage/InternationalPage";
import App from "../App";
import ClubDetailsPage from "../Pages/ClubDetailsPage/ClubDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "clubs", element: <ClubsPage /> },
      { path: "clubs/:ticker", element: <ClubDetailsPage /> },
      { path: "international", element: <InternationalPage /> },
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
