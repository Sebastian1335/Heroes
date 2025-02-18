import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components";
import queryString from "query-string";
import { getHeroByName } from "../helpers/geHeroesByName";

export const Search = () => {
    const navigate = useNavigate();

    const location = useLocation(); //! Para leer querys dentro del URL

    const { q = "" } = queryString.parse(location.search); //! extrae los querys parameters
    const { searchText, onInputChange, onResetForm } = useForm({
        searchText: q,
    });

    const heroes = getHeroByName(q);

    const showSearch = (q.length === 0) //!  devuelve un booleano
    const showError = (q.length > 0) && heroes.length === 0;
    const onSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`?q=${searchText}`); //!  Crea el query parameter
    };

    return (
        <>
            <h1>Search</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>
                        Searching
                        <hr />
                        <form onSubmit={onSearchSubmit} aria-label="form">
                            <input
                                type="text"
                                placeholder="Search a Hero"
                                className="form-control"
                                name="searchText"
                                autoComplete="off"
                                value={searchText}
                                onChange={onInputChange}
                            />
                            <button className="btn btn-outline-primary mt-1">
                                Search
                            </button>
                        </form>
                    </h4>
                </div>
                <div className="col-7">
                    <h4>Restuls</h4>
                    <hr />
                    {/* {q === "" ? (
                        <div className="alert alert-primary">Search a hero</div>
                    ) : (
                        heroes.length === 0 && (
                            <div className="alert alert-danger">
                                No hero with <b>{q}</b>
                            </div>
                        )
                    )} */}
                    <div aria-label="SearchDiv" className="alert alert-primary animate__animated animate__fadeIn" style={{display: showSearch ? '' : "none"}}>Search a hero</div>
                    <div aria-label="UnfoundDiv" className="alert alert-danger animate__animated animate__fadeIn" style={{display: showError ? '' : "none"}}>
                        No hero with <b>{q}</b>
                    </div>
                    {heroes.map((hero) => (
                        <HeroCard key={hero.id} {...hero} />
                    ))}
                </div>
            </div>
        </>
    );
};
