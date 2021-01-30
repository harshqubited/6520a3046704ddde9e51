import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/Home';
import Country from './src/Country';
import Capital from './src/Capital';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Country"
          component={Country}
          options={({route}) => ({title: route.params.countryName})}
        />
        <Stack.Screen
          name="Capital"
          component={Capital}
          options={({route}) => ({title: route.params.capital})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
