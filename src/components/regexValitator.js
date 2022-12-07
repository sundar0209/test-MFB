import react from "react";


export const emailValidator = uname => {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(uname)
}

export const passwordValidator = pword => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return passwordRegex.test(pword)
}


