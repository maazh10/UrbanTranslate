import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
} from 'react-native';
import axios from 'axios';

const UrbanTranslate = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const translateText = async (text) => {
        const response = await axios.get(`https://api.urbandictionary.com/v0/define?term=${text}`);
        const transObj = response.data.list.reduce((acc, curr) => {
            if (curr.thumbs_up > acc.thumbs_up) {
                return curr;
            }
            return acc;
        });
        const translation = `${transObj.definition}\n\nExample: ${transObj.example}`;
        setTranslatedText(translation);
    };

    const handleInputChange = (text) => {
        setInputText(text);
        translateText(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Urban Translate.</Text>
            </View>
            <View style={styles.bottom}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter text to translate"
                        value={inputText}
                        onChangeText={handleInputChange}
                    />
                </View>
                <View style={styles.translationContainer}>
                    <Text style={styles.translationText}>
                        {translatedText}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'space-around',
        paddingTop: 100,
        paddingBottom: 100,
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        backgroundColor: '#ffffff',
        height: 200,
    },
    input: {
        padding: 12,
        fontSize: 30,
    },
    translationContainer: {
        height: 200,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        backgroundColor: '#e2e8f0',
    },
    translationText: {
        fontSize: 15,
        color: '#1f2937',
    },
});

export default UrbanTranslate;
