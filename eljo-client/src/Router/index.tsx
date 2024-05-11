
import { Navigate } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../screens/Login";
import RegisterEmploye from "../screens/RegisterEmploye";
import ModifyEmployee from "../screens/ModifyEmployee";
import { Path } from "../enums/enum";

export const Routes = (IsAuthenticated: boolean) => {
  return [
        {
          path: "/",
          element: <Navigate to={Path.HOME} replace />
        },
        {
          path: Path.EDIT_EMPLOYEE + "/:id",
          element:<ProtectedRoute IsAuthenticated={IsAuthenticated}>
          <ModifyEmployee/>
          </ProtectedRoute>
      },
        {
            path: Path.HOME,
            element:<ProtectedRoute IsAuthenticated={IsAuthenticated}>
              <Dashboard/>
              </ProtectedRoute>
          },
        {
            path: Path.LOGIN,
            element: IsAuthenticated?<Navigate to={Path.HOME} replace />:<Login/>
        },
        {
            path: Path.REGISTER,
            element:<ProtectedRoute IsAuthenticated={IsAuthenticated}>
            <RegisterEmploye/>
            </ProtectedRoute>
        },
     
      ]

    }