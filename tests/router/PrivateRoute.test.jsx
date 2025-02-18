import { render, screen } from "@testing-library/react";
import { PrivateRouter } from "../../src/router/PrivateRoute";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";

describe("Pruebas en el <PrivateRoute/>", () => {
    test("Debe mostrar el children si esta atenticado", () => {
        Storage.prototype.setItem = jest.fn() //!  no se puede usar localStorage, ya que se debe sobreescribir el prototype
        const contextValue = {
            logged: true,
            user: {
                name: "Sebastian",
                id: "123",
            },
        };
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <PrivateRouter>
                        <h1>Ruta privada</h1>
                    </PrivateRouter>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText("Ruta privada")).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", '/marvel')
    });

});
