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
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "clubs",
        element: (
          <ProtectedRoute>
            <ClubsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "clubs/:clubId",
        element: (
          <ProtectedRoute>
            <ClubDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "countries",
        element: (
          <ProtectedRoute>
            <InternationalPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "countries/:countryId",
        element: (
          <ProtectedRoute>
            <InternationalDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "footballers/:footballerId",
        element: (
          <ProtectedRoute>
            <FootballerDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "createFootballer",
        element: (
          <ProtectedRoute>
            <CreateFootballer />
          </ProtectedRoute>
        ),
      },
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
