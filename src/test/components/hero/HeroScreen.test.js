
import { mount } from "enzyme"
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import { HeroScreen } from '../../../components/hero/HeroScreen';


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))


describe('pruebas en <HeroScreen />', () => {

    test('debe de mostrar el HeroScreen ', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path='/hero'element={<HeroScreen />} />
                    <Route path='/' element={ <h1>No hero Page</h1> } />
                </Routes>

            </MemoryRouter>

        )

        expect( wrapper.find('h1').text().trim()).toBe('No hero Page')
        
    })

    test('debe de mostrar un hero si el parametro existe y se encuentra', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path='/hero/:heroeId'element={<HeroScreen />} />
                    <Route path='/' element={ <h1>No hero Page</h1> } />
                </Routes>

            </MemoryRouter>

        )

        expect( wrapper.find('.row').exists()).toBe(true)
        
    })

    test('debe de regresar a la pantalla anterior', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path='/hero/:heroeId'element={<HeroScreen />} />
            
                </Routes>

            </MemoryRouter>

        )

        wrapper.find('button').prop('onClick')();

        expect( mockNavigate ).toHaveBeenCalledWith(-1);


    })


    
    
    
})

test('debe de mostrar el No hero Page si no tenemos un heroe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider122121']}>
                <Routes>
                    <Route path='/hero/:heroeId'element={<HeroScreen />} />
                    <Route path='/' element={ <h1>No hero Page</h1> } />
                </Routes>

            </MemoryRouter>

        )

        expect( wrapper.text()).toBe('No hero Page');


    })
    