import axios from "axios";

class AuthService {
    static Base_URL = process.env.REACT_APP_API_BASE_URL;

    static login(creds) {
        const url = `${this.Base_URL}/login`
        return axios.post(url, creds).then(res => {
            localStorage.setItem('currentUser', creds.email);
            localStorage.setItem('token', res.data.token);
            return res.data;
        }).catch(error => {
            throw error;
        });
    }

    static logout() {
        localStorage.clear();
    }
}

export default AuthService;