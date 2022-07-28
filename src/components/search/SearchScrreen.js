import React, { useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScrreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    console.log(location.search);

    const { q = '' } = queryString.parse(location.search);
    //console.log(query);

    const [ formValues, handleInputChange] = useForm({
        searchText: q,
    })

    const {searchText} = formValues;
    const heroesFileted = useMemo(() => getHeroesByName(q), [q] ) ; //

    const handleSearch = (e) => {
        e.preventDefault(); //evitar propagacion del formulario y el refresh
        console.log(searchText);
        navigate(`?q=${ searchText }`)
    }
    return (
        <div>
            <h1>Búsquedas</h1>
            <hr/>

            <div className='row'>

                <div className='col-5'>
                    <h4>Buscar</h4>
                    <hr/>

                    <form onSubmit={handleSearch}>
                        <input
                            type='text'
                            placeholder='Buscar un héroe'
                            className='form-control'
                            name='searchText'
                            autoComplete='off'
                            value={ searchText }
                            onChange= {handleInputChange}
                        
                        />


                        <button 
                            className='btn btn-outline-primary mt-1'
                            type='submit'>
                            Buscar...
                        </button>
                    </form>


                </div>

                <div className='col-7'>
                    <h4>Resultados</h4>
                    <hr/>

                    {
                        (q === '' )
                        ? <div className='alert alert-info' >Buscar un heroe</div>
                        : (heroesFileted.length === 0) && <div className='alert alert-danger'>No hay resultados: {q}</div>
                    }


                    {
                        heroesFileted.map(hero => (
                            <HeroCard 
                                key={hero.id}
                                {...hero}    
                            />
                        ))
                    }

                </div>

            </div>

        </div>
    )
}
