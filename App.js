import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,KeyboardAvoidingView, Platform} from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {store} from './store';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import tw from 'tailwind-react-native-classnames';


const stack = createNativeStackNavigator()


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView style={tw`flex-1`} 
          behavior= {(Platform.OS === 'ios')? "padding" : 'height'}
          keyboardVerticalOffset={Platform.OS ==='ios'? -64 :0}>
          <stack.Navigator>
            <stack.Screen 
              name='HomeScreen'
              component={HomeScreen}
              options={{
                headerShown:false,
              }}/>
              <stack.Screen 
              name='MapScreen'
              component={MapScreen}
              options={{
                headerShown:false,
              }}/>
          </stack.Navigator>
          </KeyboardAvoidingView>
          
        </SafeAreaProvider>  
      </NavigationContainer>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
