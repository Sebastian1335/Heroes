import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { NavBar } from "../../../src/ui/components/NavBar";
import { AuthContext } from "../../../src/auth";
import { MemoryRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate
}));
describe("Pruebas en el <NavBar/>|", () => {
    const contextValue = {
        logged: true,
        user: {
            name: "Sebastian",
            id: "123",
        },
        logout: jest.fn()
    };
    beforeEach(() => jest.clearAllMocks())

    test("Probar que aparezca el nombre del usuario", () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <NavBar/>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        screen.debug();
        expect(screen.getByText('Sebastian')).toBeTruthy()
    });

    test("Debe de llamar el logout y el navigate cuando se hace click en el logout ", () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <NavBar/>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(contextValue.logout).toHaveBeenCalled()
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/login", {"replace": true})
    });
});
