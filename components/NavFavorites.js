import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements/dist/icons/Icon';
import tw from 'tailwind-react-native-classnames';
import { useDispatch , useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

const data =[
    {
        id:'123',
        icon:'home',
        placename:'Home',
        destination:'100 Willoughby Street, Brooklyn, NY, USA',
        location:{
            lat: 40.69202170000001,
            lng: -73.9847946,}
        
    },
    {
        id:'456',
        icon:'briefcase',
        placename:'Work',
        destination:'Wall Street, New York, NY, USA',
        location:{
            lat: 40.7060361, 
            lng: -74.0088256,}
        
    },
];


const NavFavorites = (props) => {
    const navigation= useNavigation();
    const dispatch = useDispatch();


  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item)=>item.id}
        ItemSeparatorComponent={()=>(
            <View style={[tw`bg-gray-200`,{height:0.5}]}/>
        )}
        renderItem={({item:{placename,destination,icon,location}})=>(
            <TouchableOpacity 
            style={tw`flex-row items-center p-5`}
            onPress={()=>{
                if(props.mode==='destination'){
                    dispatch(setDestination({
                        location:location,
                        description: destination,
                      }));
                      navigation.navigate('RideOptionsCard');
                      console.log(123);
                }else{
                    dispatch(setOrigin({
                        location:location,
                        description: destination,
                      }));
                    navigation.navigate('MapScreen');
                    dispatch(setDestination(null));
                }
            }}>
                <Icon
                    style={tw`mr-4 rounded-full bg-black p-3`}
                    name={icon}
                    type="ionicon"
                    color='white'
                    size={18}
                />
                <View>
                    <Text style={tw`font-semibold text-lg`}>{placename}</Text>
                    <Text>{destination}</Text>
                </View>
            </TouchableOpacity>
        )

        }
      />
    </View>
  )
}

export default NavFavorites

const styles = StyleSheet.create({})