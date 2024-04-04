import axios from "axios";

class SignUpService {
    static BASE_URL = process.env.REACT_APP_API_BASE_URL;

    static signUp(creds) {
        const url = `${this.BASE_URL}/signUp`;
        return axios.post(url, creds).then(res => {
            return res.data;
        });
    }
}

export default SignUpService;