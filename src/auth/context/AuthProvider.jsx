import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/types";

const init = () => {
    //! cada ve que se inicia la pagina se ejecuta la funcion de inicializacion
    const user = JSON.parse(localStorage.getItem("user"));
    return {
        logged: !!user,
        user: user,
    };
};
export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {}, init);
    const login = (name = "") => {
        const user = { id: "ABC", name };
        const action = {
            type: types.login,
            payload: {
                id: "ABC",
                name: name,
            },
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(action);
    };

    const logout = () => {
      localStorage.removeItem('user');
      const action = {
        type: types.logout,
      }
      dispatch(action)
    }

    //! el AuthProvider devuelve un authContext junto con sus hijos y sus valores
    //! Provee el AuthState (Logged, user) y los metodos login y provider
    return (
        <AuthContext.Provider
            value={{
                ...authState,
                login: login,
                logout: logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
