import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScrreen } from "../../../components/search/SearchScrreen";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,

}))

describe('pruebas en <SearchScreen />', () => {

    test('debe de mostrarse correctamente con valores por defecto', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScrreen />
            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot();     
        expect(wrapper.find('.alert-info').text().trim()).toBe('Buscar un heroe')   
    })

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScrreen />
            </MemoryRouter>
    )

    expect( wrapper.find('input').prop('value')).toBe('batman');
    
    })

    test('debe de mostrar error si no se encuentra un hero', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchScrreen />
            </MemoryRouter>
    )

    expect(wrapper.find('.alert-danger').text().trim()).toBe('No hay resultados: batman123')   


    })

    test('debe de llamar el navigate a la nueva pantalla', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScrreen />
            </MemoryRouter>
    )
        

    wrapper.find('input').simulate('change', {
        target: {
            name: 'searchText',
            value: 'batman'
        }
    })

    wrapper.find('form').prop('onSubmit')({
        preventDefault(){}
    })
    

    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('?q=batman');

    })
    

})