export const loginConst = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};
const initialState = localStorage.getItem("loginDetails") || '{}'
console.log("initialState===", initialState)

const LoginReducer = (state = { payload: JSON.parse(initialState) }, action) => {
    switch (action.type) {
        case loginConst.SUCCESS:
            return {
                login: 'login-success',
                payload: action.payload
            };
        case loginConst.ERROR:
            return {
                login: 'login-fail',
                payload: action.payload
            };
        default:
            return state
    }
}

export default LoginReducer 