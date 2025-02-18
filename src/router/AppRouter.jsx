import {  Route, Routes } from "react-router-dom"
import {NavBar} from '../ui'
import {HeroesRoutes} from '../heroes'
import {LoginPage} from '../auth'
import { PrivateRouter } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"
export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="login/*" element={
              <PublicRoute>
                {/* <LoginPage/> */}
                <Routes>
                  <Route path="/*" element={<LoginPage/>}/>
                </Routes>
              </PublicRoute>
            }/>
            <Route path="/*" element={
              <PrivateRouter>  {/* //!  Dentro de este componenete se evalua si esta autenticado o no */}
                <HeroesRoutes/>
              </PrivateRouter>
            }/>
            {/* <Route path="/*" element={<HeroesRoutes/>}/>  //! Esta as la ruta que necesito proteger */}
        </Routes>
    </>
  )
}
