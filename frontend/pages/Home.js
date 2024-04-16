import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import PropTypes from 'prop-types';
import { ThemedButton } from 'react-native-really-awesome-button';
import { Entypo } from '@expo/vector-icons';

const Home = ({ navigation }) => {

  return (

    <View style={styles.container}>

      <StatusBar
        backgroundColor="#f8f9fa"
        barStyle="dark-content"
      />

      <View style={styles.top}>
        <Image
          source={require('../assets/splash.png')}
          style={{ width: '100%', height: 150 }}
          resizeMode='contain'
        />
      </View>

      <View style={styles.bottom}>

        <ThemedButton
          name="bruce"
          type="primary"
          width="100%"
          height={70}
          borderRadius={60}
          backgroundColor='#1f2937'
          backgroundDarker='#2f3e53'
          textSize={30}
          onPress={() => navigation.navigate('Define')}
        >

          <View style={styles.buttonContent}>
            <Entypo name="book" size={24} color="white" />
            <View style={{ width: '85%' }}>
              <Text style={styles.btnText}>Define a word</Text>
            </View>
          </View>

        </ThemedButton>

        <ThemedButton
          name="bruce"
          type="primary"
          width="100%"
          height={70}
          borderRadius={60}
          backgroundColor='#1f2937'
          backgroundDarker='#2f3e53'
          textSize={30}
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate('Translate')}
        >

          <View style={styles.buttonContent}>
            <Entypo name="text" size={24} color="white" />
            <View style={{ width: '85%' }}>
              <Text style={styles.btnText}>Translate a sentence</Text>
            </View>
          </View>

        </ThemedButton>

      </View>

    </View >

  );
};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  top: {
    width: '100%',
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
  },
  btnText: {
    color: '#f8f9fa',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
});

export default Home;
