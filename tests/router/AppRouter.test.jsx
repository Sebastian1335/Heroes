import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { MemoryRouter } from "react-router-dom"
import {AppRouter} from "../../src/router/AppRouter"
describe('Pruebas en <AppRouter/>', () => {
    test('Debe de mostrar el login si no esta autenticado', () => {
        const contextValue = {
            logged: false
        }
        render(
            <MemoryRouter initialEntries={['/marvel']}>

                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )
        expect(screen.getByText('Login')).toBeTruthy()
        expect(screen.getByText('login')).toBeTruthy()
    })

    test('Debe de mostrar el componenete de marvel si esta autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Sebastian',
                id: '123'
            }
        }
        render(
            <MemoryRouter initialEntries={['/login']}>

                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )
        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1)
    })
})