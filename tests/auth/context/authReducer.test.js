import {authReducer, types} from '../../../src/auth'

describe('Pruebas en el AuthReducer', () => {
    
    const state = {
            
    }

    test('Debe de retornar el estado por defecto', () => {
        const result = authReducer(state, 'Default')
        expect(result).toBe(state)
    })
    test('debe de (login) llamar el login autenticar y establecer el user', () => {
        
        const action = {
            type: types.login,
            payload: {
                id: "ABC",
                name: 'name',
            },
        };
        const result = authReducer(state, action)
        expect(result.logged).toBeTruthy()
        expect(result.user).toBe(action.payload)
    })
    test('Debe de (logout) borrar el name del usuario y logged en false', () => {
        const action = {
            type: types.logout,
            payload: {
                id: "ABC",
                name: 'name',
            },
        };
        const result = authReducer(state, action)
        expect(result.logged).toBeFalsy()
        expect(result.user).toBeFalsy()
    })

})