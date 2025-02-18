import { Navigate, useNavigate, useParams } from "react-router-dom"
import {getHeroById} from '../helpers'
import { useMemo } from "react"

export const HeroPage = () => {

  const {heroId} = useParams()//! useParams para recojer la informacion de la URL como variables
  const navigate = useNavigate()

  const hero =useMemo(() => getHeroById(heroId), [heroId]) //! Si al Id no cambia no se vuelve a disparar la funcion, de lo contrario si

  const onNavigateback = () => {
    if (hero.publisher.includes('Marvel')) {
      navigate('/marvel')
    }else{
      navigate('/dc')
    }
  }

  if (!hero) {
    return <Navigate to={"/marvel"}/> //! Es para que te saque a determinada direccion cuando no ingresas un URl valido
  }
  return (
    <div className="row mt-5 animate__animated animate__fadeInLeft">
      <div className="col-4">
        <img 
          src= {`/assets/heroes/${heroId}.jpg`}
          alt={hero.superhero} 
          className="img-thumbnail "
        />
      </div>
      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><b>Alter ego:</b> {hero.alter_ego}</li>
          <li className="list-group-item"><b>Publisher</b> {hero.publisher}</li>
          <li className="list-group-item"><b>First Appearence</b> {hero.first_appearance}</li>
        </ul>
        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>
        <button 
          onClick={onNavigateback}
          className="btn btn-outline-primary">
          Back
        </button>
      </div>
    </div>

  )
}
