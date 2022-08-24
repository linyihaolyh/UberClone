import { StyleSheet, Text, View, SafeAreaView ,Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import React from 'react';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env';
import { useDispatch } from 'react-redux';
import {setDestination, setOrigin} from '../slices/navSlice';
import NavFavorites from '../components/NavFavorites';


const HomeScreen = () => {
  const dispatch = useDispatch();


  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={[tw`p-5`,{flexGrow: 0,flexShrink: 0}]}>
        <Image 
            style={{width:100,height:100,resizeMode:'contain'}}
            source={{
                uri:'https://links.papareact.com/gzs',
        }}/>
      </View>
      <View style={{flexDirection: 'row'}} >
        <GooglePlacesAutocomplete
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={400} ///wait for 400 ms to search
        placeholder='Where From?'
        style={{
            container: {
                flex:1,
            },
            textInput:{
                fontSize:18,
            }
            }}
        query={{
            key:GOOGLE_MAPS_APIKEY,
            language:'en',
        }}
        returnKeyType={'search'}
        minLength={2}
        fetchDetails={true}
        enablePoweredByContainer={false}
        onPress={(data, details=null)=>{
            console.log(data.description)
            dispatch(setOrigin({
              location:details.geometry.location,
              description: data.description,
            }));
            dispatch(setDestination(null));
        }}
        />
      </View>
      <NavOptions/>
      <NavFavorites/>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    text:{
        color:'blue',
    }
})