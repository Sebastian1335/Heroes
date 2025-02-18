import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Search } from "../../../src/heroes/pages/Search"


const MockedUsednavigate = jest.fn() //! Necesariamente debe tener el nombre Mocked...

jest.mock('react-router-dom',() => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => MockedUsednavigate
}))
describe('Pruebas en el <Search/>', () => {
    beforeEach(() => jest.clearAllMocks())
    test('debe de mostrarse correctamente con valores por defecto', () => {
        const {container} = render(
            <MemoryRouter>
                <Search/>
            </MemoryRouter>
        )
        expect(container).toMatchSnapshot()
    })
    test('Debe de mostrar a Batman y el input con el valor del queryString', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Search/>
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox')
        expect(input.value).toBe('batman')
        const img = screen.getByRole('img')
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg')
        const divSearch = screen.getByLabelText('SearchDiv')
        expect(divSearch.style._values).toEqual({"display": "none"})
    })
    test('Debe de mostrar un error si no se encuentra el hero (batman123)', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=WASAA']}>
                <Search/>
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox')
        expect(input.value).toBe('WASAA')
        const divUnfound = screen.getByLabelText('UnfoundDiv')
        expect(divUnfound.style.display).toBe("")
    })
    test('Debe de llamar el navigate a la pantalla nueva', () => {
        //* Disparar evento en la caja de texto para ingresar un valor
        //* Agarrar el formulario y disparar el  evento submit
        //* Espero que se mande a mandar el navigare con el argumento de superheroe
        render(
            <MemoryRouter initialEntries={['/search']}>
                <Search/>
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox')
        fireEvent.change(input, {target: { name: 'searchText', value: 'superman'}})
        screen.debug()
        const form = screen.getByRole('form') //! no confundir getBy con findBy
        fireEvent.submit(form)
        expect(MockedUsednavigate).toHaveBeenCalledWith('?q=superman')

    })
})

//! Leer parametros del url con memory router