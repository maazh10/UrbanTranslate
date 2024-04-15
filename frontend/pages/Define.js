import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Animated,
    Keyboard,
    ToastAndroid,
    Text,
    ScrollView
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { ApiService } from '../services/ApiService';

const Define = () => {
    const [inputText, setInputText] = useState('');
    const [definition, setDefinition] = useState('');
    const [example, setExample] = useState('');
    const [showBottomContainer, setShowBottomContainer] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current;

    const defineWord = async (word) => {
        if (!word) {
            ToastAndroid.show('Please enter a word', ToastAndroid.SHORT);
            return;
        }

        setShowBottomContainer(true);

        try {
            const api = new ApiService();
            const { definition, example } = await api.define(word);

            setDefinition(definition || `No definition found for ${word}`);
            setExample(example || `No example found for ${word}`);

            opacity.setValue(0);
            Animated.timing(opacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        } catch (error) {
            setTranslatedText(`Something went wrong...`);
        }
    };

    const handleInputChange = (word) => {
        setInputText(word);
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <View style={styles.container}>

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
                        onSubmitEditing={() => defineWord(inputText)}
                    />

                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            defineWord(inputText)
                            Keyboard.dismiss();
                        }}>
                        <AntDesign name="arrowright" size={24} color="white" />
                    </TouchableOpacity>

                </View>

                {showBottomContainer && (
                    <View style={styles.bottomContainer}>
                        <View>
                            <Text style={styles.title}> Definition</Text>
                            <View style={styles.translationContainer}>
                                <Animated.Text style={[
                                    styles.translationText,
                                    { opacity: opacity },
                                ]}>
                                    {definition}
                                </Animated.Text>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.title}> Example</Text>
                            <View style={styles.translationContainer}>
                                <Animated.Text style={[
                                    styles.translationText,
                                    { opacity: opacity },
                                ]}>
                                    {example}
                                </Animated.Text>
                            </View>
                        </View>
                    </View>)}

            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        paddingTop: 50,
        paddingHorizontal: 30,
    },
    inputContainer: {
        height: 60,
        borderColor: '#ced4da',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        padding: 12,
        fontSize: 20,
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1f2937',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
    },
    buttonText: {
        color: '#f8f9fa',
        fontSize: 18,
    },
    bottomContainer: {
        flex: 0.8,
        gap: 40,
        paddingVertical: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 20,
    },
    translationText: {
        fontSize: 20,
        color: '#1f2937',
    },
    translationContainer: {
        backgroundColor: '#e2e8f0',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ced4da',
    },
});

export default Define;
