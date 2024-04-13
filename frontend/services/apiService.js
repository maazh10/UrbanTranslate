import axios from 'axios';

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://192.168.2.220:3000'
        });
    }

    async define(word) {
        const response = await this.api.get(`/define/${word}`);
        return response.data;
    }

    async translate(text) {
        text = text.split(' ').join('%20');
        const response = await this.api.get(`/translate/${text}`);
        return response.data;
    }
}

export { ApiService };