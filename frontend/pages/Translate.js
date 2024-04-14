import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
} from 'react-native';
import { ApiService } from '../services/ApiService';

const Translate = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const translate = async (text) => {
        try {
            const api = new ApiService();
            const res = await api.translate(text);
            const translation = res.translation;
            setTranslatedText(translation);
        } catch (error) {
            setTranslatedText('An error occurred while translating the text');
        }
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
                        multiline={true}
                        onChangeText={(text) => setInputText(text)}
                    />
                </View>
                <View style={styles.translationContainer}>
                    <Text style={styles.translationText}>
                        {translatedText}
                    </Text>
                </View>
                <View style={styles.btnContainer}>
                    <Button style={styles.translateBtn} title="Translate" onPress={() => translate(inputText)} />
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
        flexGrow: 1,
    },
    input: {
        padding: 12,
        fontSize: 20,
    },
    translationContainer: {
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        backgroundColor: '#e2e8f0',
        paddingHorizontal: 12,
        paddingBottom: 30,
        flexGrow: 1,
    },
    translationText: {
        fontSize: 20,
    },
    btnContainer: {
        marginTop: 20,
    },
    bottom: {
        flex: 1,
    },
});

export default Translate;
