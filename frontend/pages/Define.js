import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
} from 'react-native';
import { ApiService } from '../services/apiService';

const Define = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const defineWord = async (word) => {
        try {
            const api = new ApiService();
            const res = await api.define(word);
            const definition = res.definition;
            const example = res.example;
            setTranslatedText(`Definition: ${definition}\n\nExample: ${example}`);
        } catch (error) {
            setTranslatedText(`Something went wrong...`);
        }
    };

    const handleInputChange = (word) => {
        setInputText(word);
        defineWord(word);
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
                        placeholder="Enter word to translate"
                        value={inputText}
                        onChangeText={(text) => {
                            const newText = text.replace(/\s/g, '');
                            if (newText.length <= 20) {
                                handleInputChange(newText);
                            }
                        }}
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
        paddingTop: 50,
        paddingBottom: 100,
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 20,
    },
    inputContainer: {
        height: 60,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    input: {
        padding: 12,
        fontSize: 20,
    },
    translationContainer: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        backgroundColor: '#e2e8f0',
    },
    translationText: {
        fontSize: 20,
        color: '#1f2937',
    },
    bottom: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default Define;
