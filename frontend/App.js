import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Define from './pages/Define';
import Translate from './pages/Translate';

import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Define" component={Define}
                    options={{
                        title: 'Define a Word',
                        headerStyle: {
                            backgroundColor: '#1f2937',
                        },
                        headerTintColor: '#ffffff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen name="Translate" component={Translate}
                    options={{
                        title: 'Translate a Sentence',
                        headerStyle: {
                            backgroundColor: '#1f2937',
                        },
                        headerTintColor: '#ffffff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
};

export default MyStack;