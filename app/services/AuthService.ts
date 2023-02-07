import {instance} from "@/api/api";

export const AuthService = {

    async issueCSRF() {
      return instance.get('sanctum/csrf-cookie')
    },

    async register (email: string, password: string, name: string) {
        return instance.post('register', {email, password, 'password_confirmation': password, name})
    },

    async login (email: string, password: string) {
        return instance.post('login', {email, password})
    },

    async logout () {
        return instance.post('logout')
    },
}