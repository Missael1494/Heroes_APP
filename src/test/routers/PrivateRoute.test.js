import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../auth/authContext'
import { PrivateRoute } from '../../routers/PrivateRoute'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo de Aqui</span>
}));


describe('Pruebas en <PrivateRoute />', () => {

    Storage.prototype.setItem = jest.fn();
    
    test('debe de mostrar el componente si esta autenticado y guardar en el localStorage', () => {

        const contextValue = {
            user: {
                logged: true,
                name: 'Pepe'
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue} >
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private component</h1>
                    </PrivateRoute>
                </MemoryRouter>

            </AuthContext.Provider>
        );

        console.log(wrapper.html());
        expect( wrapper.text()).toBe('Private component');
        expect(localStorage.setItem).toHaveBeenCalledWith('lasthPath', '/')
        
    })

    test('debe de bloquear el componente si no esta autenticado', () => {

        const contextValue = {
            user: {
                logged: false,
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue} >
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private component</h1>
                    </PrivateRoute>
                </MemoryRouter>

            </AuthContext.Provider>
        );

        console.log(wrapper.html());
        expect( wrapper.text()).toBe('Saliendo de Aqui');

        
    })
    

})
