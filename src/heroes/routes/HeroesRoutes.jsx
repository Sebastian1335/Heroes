import { Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "../../ui";
import { DcPage, HeroPage, MarvelPage, Search } from "../pages";

export const HeroesRoutes = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <Routes>
                    <Route path="marvel" element={<MarvelPage />} />
                    <Route path="dc" element={<DcPage />} />
                    <Route path="search" element={<Search />} />
                    <Route path="hero/:heroId" element={<HeroPage />} /> //! Lo que va despues de los dos puntos 
                    {/* //! se envia como parametro al HeroPage que luego se puede extraer con useParams */}
                    <Route path="/" element={<Navigate to={"/marvel"} />} />
                </Routes>
            </div>
        </>
    );
};
