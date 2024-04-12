import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';

const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.title}>Urban Translate.</Text>
      </View>
      <View style={styles.bottom}>
        <Pressable style={styles.btnContainer} onPress={() => navigation.navigate('Define')}>
          <Text style={styles.btnText}>I would like to define a word</Text>
        </Pressable>
        <Pressable style={styles.btnContainer} onPress={() => navigation.navigate('Translate')}>
          <Text style={styles.btnText}>I would like to translate a sentence</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    paddingTop: 100,
    paddingBottom: 100,
  },
  welcome: {
    fontSize: 30,
    color: '#1f2937',
    marginBottom: 10,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
  },
  btnContainer: {
    backgroundColor: '#1f2937',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20
  },
  btnText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Home;
