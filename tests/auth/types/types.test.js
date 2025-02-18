import { types } from "../../../src/auth";

describe("Pruebas del types del auth", () => {
    test("Debe de regresar esto types", () => {
        expect(types).toEqual({
            login: "[Auth] Login",
            logout: "[Auth] Logout",
        });
    });
});
