import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    ToastAndroid,
    ScrollView
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { ThemedButton } from 'react-native-really-awesome-button';
import TypeWriter from 'react-native-typewriter'

import { ApiService } from '../services/ApiService';

const Translate = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [typing, setTyping] = useState(false);
    const [showBottomContainer, setShowBottomContainer] = useState(false);

    const translate = async (text) => {
        if (!text) {
            ToastAndroid.show('Please enter text to translate', ToastAndroid.SHORT);
            return;
        }
        try {
            const api = new ApiService();
            const res = await api.translate(text);
            const translation = res.translation;
            setTranslatedText(translation);
        } catch (error) {
            setTranslatedText('An error occurred while translating the text');
        }
    };

    const handleProgress = async (release) => {
        if (release) {
            await translate(inputText);
            setTyping(true);
            release();
            setShowBottomContainer(true);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter text to translate"
                        value={inputText}
                        maxLength={500}
                        multiline={true}
                        onChangeText={(text) => setInputText(text)}
                    />
                </View>

                {showBottomContainer &&
                    (<View style={styles.translationContainer}>
                        {typing && (
                            <TypeWriter typing={1}
                                initialDelay={100}
                                onTypingEnd={() => setTyping(false)}>
                                <Text style={styles.translationText}>
                                    {translatedText}
                                </Text>
                            </TypeWriter>
                        )}
                        {!typing && (
                            <Text style={styles.translationText}>
                                {translatedText}
                            </Text>
                        )}
                    </View>)}

                <View style={styles.btnContainer}>
                    <ThemedButton progress name="rick" type="primary"
                        width="100%"
                        height={70}
                        borderRadius={60}
                        onPress={handleProgress}
                        backgroundDarker='#5275ad'
                        backgroundProgress='#5275ad'
                        style={styles.button}
                        extra={
                            <LinearGradient
                                colors={["#1f2937", "#5275ad"]}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                style={{ ...StyleSheet.absoluteFillObject }}
                            />
                        }><Text style={styles.btnText}>Translate</Text></ThemedButton>
                </View>

            </View>

        </ScrollView>

    );
};

const styles = StyleSheet.create({
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
        borderRadius: 20,
        backgroundColor: '#ffffff',
        padding: 20,
        height: 300,
    },
    input: {
        padding: 12,
        fontSize: 20,
    },
    translationContainer: {
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 20,
        backgroundColor: '#e2e8f0',
        padding: 20,
    },
    translationText: {
        fontSize: 20,
    },
    btnContainer: {
        marginTop: 20,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        paddingBottom: 100,
    },
    btnText: {
        fontWeight: 'bold',
        color: '#f8f9fa',
        fontSize: 25,
        letterSpacing: 2,
    },
});

export default Translate;
