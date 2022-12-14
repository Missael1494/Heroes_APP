import React from 'react'
import { useMemo } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'

import { getHeroById } from '../../selectors/getHeroById'

export const HeroScreen = () => {

    const { heroeId } = useParams();
    const navigate = useNavigate();

    const hero = useMemo(() =>  getHeroById(heroeId ), [heroeId]) 
    console.log('hero1', hero);

    console.log(heroeId);

    const handleReturn = () => {
        navigate(-1);
    }

    if(!hero){
        return <Navigate to='/' />
    }

    
    const {
        id,
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero
    
    console.log(hero);
    console.log(id);
    const imagePath = `/assets/${ id }.jpg`; //hero.id estaba antes de hacer destructuring

    return (
        <div className='row mt-5'>
            <div className='col-4'>
                <img 
                    src={imagePath} 
                    alt={superhero}  //hero.superhero
                    className='img-thumbnail animate__animated animate__fadeInLeft'
                    
                    />
            </div>

            <div className='col-8'>
                <h3> {hero.superhero } </h3>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'> <b>Alter ego:</b> {alter_ego} </li>
                    <li className='list-group-item'> <b>Publisher:</b> {publisher} </li> 
                    <li className='list-group-item'> <b>First Appearance:</b> {first_appearance} </li>  
                </ul>

                <h5 className='mt-3'>Characters</h5>

                <button
                    className='btn btn-outline-info'
                    onClick={ handleReturn}
                >
                    Regresar
                </button>

            </div>
            

        </div>
    )
}
