import { useNavigate } from 'react-router-dom';
import { mount } from "enzyme"
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from '../../../auth/authContext';
//import { authReducer } from '../../auth/authReducer';
import { types } from '../../../types/types';
import { LoginScreen } from '../../../components/login/LoginScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('Pruebas en el <LoginComponent />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }

        

    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path='/login' element={<LoginScreen />}/>
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    test('debe de hacer match con el Snapshot', () => {
        
        expect(wrapper).toMatchSnapshot();

    });

    test('debe de realizar el dispatch y la navegacion', () => {
        
        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {name: 'Misa'}
        })

        expect( mockNavigate ).toHaveBeenCalledWith('/marvel', {replace: true})

        localStorage.setItem('lasthPath', '/dc')

        handleClick();

        expect(mockNavigate).toHaveBeenCalledWith('/dc', {replace: true});

    })
    
    

})