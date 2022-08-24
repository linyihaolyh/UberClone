import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView ,{Marker} from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, selectTravelTimeInformation, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '@env';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    //map hook to manipulate
    const mapRef = useRef(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    const dispatch = useDispatch();

    useEffect(()=>{
      if (!origin||!destination) return;
      // zoom &fit
      mapRef.current.fitToSuppliedMarkers(['origin','destination'],{
        edgePadding:{top:50,right:50,bottom:50,left:50},
      });
    },[origin,destination]);

    useEffect(()=>{
      if (!origin ||!destination) return;
      const getTravelTime=async()=>{
        fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`).then(
          (res)=>res.json()
        ).then((data) =>{
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
          console.log(data.rows[0].elements[0])
        })
        
      }
      getTravelTime();
    },[origin,destination,GOOGLE_MAPS_APIKEY])

    useEffect(()=>{
      if(travelTimeInformation.status ==="ZERO_RESULTS"){
        alert('?')
      }
    },[travelTimeInformation])


  return (
    <MapView
    ref={mapRef}
    style={tw`flex-1`}
    mapType={'mutedStandard'}
    initialRegion={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }}>
    {origin?.location && (
        <Marker
            coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
            }}
            title='Start Location'
            description={origin.description}
            identifier='origin'
        />
    )}
    {destination?.location && (
        <Marker
            coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
            }}
            title='Destination'
            description={destination.description}
            identifier='destination'
        />
    )}
    {origin && destination &&(
      <MapViewDirections
        origin={origin.description}
        destination={destination.description}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeColor='black'
        strokeWidth={3}
      />
    )}


    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})