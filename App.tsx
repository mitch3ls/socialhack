import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwipeScreen from './screens/SwipeScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Swipe">
        <Stack.Screen name="Swipe" component={SwipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

