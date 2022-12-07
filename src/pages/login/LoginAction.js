const loginConst = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

const LoginActions = {
    success,
    error
};


function success(payload) {
    return { type: loginConst.SUCCESS, payload };
}

function error(payload) {
    return { type: loginConst.ERROR, payload };
}

export default LoginActions;