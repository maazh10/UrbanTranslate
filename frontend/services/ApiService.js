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
        try {
            const response = await this.api.get(`/translate/${text}`);
            return response.data;
        }
        catch (error) {
            console.error('Error translating text:', error);
            return {
                translation: 'An error occurred while translating the text'
            };
        }
    }
}

export { ApiService };