import {instance} from "@/api/api";
import {getFromLocalStorage} from "@/utils/getFromLocalStorage";

instance.interceptors.request.use(
    (config) => {
        const token = getFromLocalStorage('token')
        if (config.headers && token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
);