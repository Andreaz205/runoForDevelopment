import Cookies from "js-cookie";

export const clearCookieToken = () => {
    Cookies.remove('XSRF-TOKEN')
}