import axios from "axios";
export const axiosObject = axios.create({
    baseURL: "http://dev-service.myfinbuddy.in/MyFin_service/v1/"
});