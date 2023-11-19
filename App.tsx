import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { store } from './state/store'
import SwipeScreen from './screens/SwipeScreen';
import ResultsScreen from './screens/ResultsScreen';
import { useEffect } from 'react';
import WorkingScreen from './screens/WorkingScreen';
import ResourcesScreen from './screens/ResourcesScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Swipe" screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Swipe" component={SwipeScreen} />
          <Stack.Screen name="Working" component={WorkingScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="Resources" component={ResourcesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

