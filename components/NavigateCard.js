import { StyleSheet, Text,  SafeAreaView ,View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import NavFavorites from './NavFavorites';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';



const NavigateCard = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
            <GooglePlacesAutocomplete
                placeholder='Where to?'
                styles={toInputBoxStyle}
                enablePoweredByContainer={false}
                returnKeyType={'search'}
                minLength={2}
                fetchDetails={true}
                debounce={400}
                nearbyPlacesAPI='GooglePlacesSearch'
                query={{
                    key:GOOGLE_MAPS_APIKEY,
                    language:'en',
                }}
                onPress={(data, details=null)=>{
                    console.log(details.geometry.location)
                    dispatch(
                        setDestination({
                            location:details.geometry.location,
                            description: data.description,
                        }));
                    navigation.navigate('RideOptionsCard');
                      
                }}
            />
        </View>
        <NavFavorites mode='destination'/>
        </View>



        <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
            <TouchableOpacity style={tw`flex justify-between flex-row bg-black w-24 px-4 py-3 rounded-full`}
            onPress={()=>navigation.navigate('RideOptionsCard')}>
                <Icon name='car' type='font-awesome' color='white' size={16}/>
                <Text style={tw`text-white text-center`}>Rides</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                <Icon
                    name='fast-food-outline'
                    type='ionicon'
                    color='black'
                    size={16}
                />
                <Text>Eats</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
};

export default NavigateCard;

const toInputBoxStyle = StyleSheet.create({
    container:{
        backgroundColor:'white',
        paddingTop:20,
        flex:0,
    },
    textInput:{
        backgroundColor:'#DDDDDF',
        borderRadius:0,
        fontSize:18
    },
    textInputContainer:{
        paddingHorizontal:20,
        paddingBottom:0,
    },
});