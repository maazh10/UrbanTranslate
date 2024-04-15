import axios from 'axios';

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: process.env.EXPO_PUBLIC_API_URL
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