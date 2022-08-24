import { StyleSheet, Text,  View, SafeAreaView, FlatList } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data=[
  {
    id:'Uber-X-123',
    title:'Uber X',
    multiplier:1,
    image:'https://links.papareact.com/3pn',
  },
  {
    id:'Uber-XL-456',
    title:'Uber XL',
    multiplier:1.2,
    image:'https://links.papareact.com/5w8',
  },
  {
    id:'Uber-LUX-789',
    title:'Uber LUX',
    multiplier:1.75,
    image:'https://links.papareact.com/7pf',
  },
];

const SURGE_CHARGE_RATE =1.5;

const RideOptionsCard = () => {
  const navigation= useNavigation();
  const [selected, setSelected]= useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      
      <View  style={tw`mt-auto border-b border-gray-200`}>
          <TouchableOpacity style={tw`absolute top-3 left-5 p-3 rounded-full z-10`}
            onPress={()=>navigation.navigate('NavigateCard')}>
                <Icon name='chevron-left' type='fontawesome'/>
          </TouchableOpacity>

        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      
      <FlatList
        data={data}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          <TouchableOpacity 
            onPress={()=>{setSelected(item);
              console.log(travelTimeInformation?.distance?.text);}}
            style={tw`flex-row justify-between items-center px-10
            ${item.id === selected?.id && 'bg-gray-200'}`}>
            <Image
                source={{uri:item.image}}
                style={{width:100,height:100,resizeMode:"contain"}}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{travelTimeInformation?.distance?.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-us',{style:'currency',currency:"USD",}).format(
                  (travelTimeInformation?.duration?.value* SURGE_CHARGE_RATE* item.multiplier /100)
                )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity 
        style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-400'}`}
        disabled={!selected}
        >
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})