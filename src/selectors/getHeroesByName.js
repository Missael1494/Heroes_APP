import React from 'react'
import { heroes } from '../data/heroes'


export const getHeroesByName = ( name = '') => {

    console.log('getHeroesByName called'); // se llama cada vez que se escribe algo solucion usar useMemo
    
    if( name .length === 0 )
    {
        return [];
    }

    name = name.toLowerCase();
    return heroes.filter(hero => hero.superhero.toLowerCase().includes(name))

    


}
