import axios from 'axios';
import OpenAI from 'openai';

const apiService = {

    tokenizeText: (text) => {
        const stopWords = [
            'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'because',
            'as', 'of', 'in', 'on', 'with', 'by', 'for', 'to', 'at', 'from', 'is', 'are',
            'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
            'can', 'could', 'should', 'would', 'will', 'may', 'might', 'must', 'shall'
        ];
        const words = text.toLowerCase().split(' ');
        return words.filter((word) => !stopWords.includes(word));
    },

    define: async (word) => {
        const response = await axios.get(`https://api.urbandictionary.com/v0/define?term=${word}`);
        if (response.data.list.length === 0)
            return word;
        const def = response.data.list.reduce((acc, curr) => {
            if (curr.thumbs_up > acc.thumbs_up) {
                return curr;
            }
            return acc;
        });
        return def;
    },

    translate: async (text) => {
        const words = apiService.tokenizeText(text);
        const definitions = await Promise.all(words.map(async (word) => await apiService.define(word).definition));
        const prePrompt = "Your job is to translate english sentences containing urban slang into plain english sentences for normal english speakers to understand.you will be given a sentence in the following format and a list of definitions of some of the terms in the following format: Sentence: { sentence } Definitions: Word #1: {definition of word #1 } Word #2: {definition of word #2 } and so on... Provide the translated version of the sentence in plain English. Only respond back with the translated sentence. Do not include anything else in your response. The format of your response should ONLY be the translated text no extra words or punctuation, etc.\n\n";
        let prompt = `Sentence: ${text} \n\n`;
        for (let i = 0; i < words.length; i++) {
            prompt += `${words[i]}: ${definitions[i]}\n`;
        }
        const openai = new OpenAI({ apiKey: "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" });
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: prePrompt + prompt,
            max_tokens: 100,
        });
        const translation = response.choices[0].text;
        return translation;
    }

}

export { apiService };