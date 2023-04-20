import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';



const Map = ({ onAddressChange  }) => {
    const [mapRegion, setMapRegion] = useState(null);
    const mapRef = useRef(null);

    const [markerCoordinate, setMarkerCoordinate] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });

    const [markerAddress, setMarkerAddress] = useState('');

    const handleMapPress = async (event) => {
        const { coordinate } = event.nativeEvent;
        setMarkerCoordinate(coordinate);
        
        const address = await Location.reverseGeocodeAsync(coordinate);
        const formattedAddress = `${address[0].name}, ${address[0].street}, ${address[0].city}, ${address[0].region} ${address[0].postalCode}, ${address[0].country}`;

        setMarkerAddress(formattedAddress);
        onAddressChange(formattedAddress);

        mapRef.current.animateToRegion({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.030,
            longitudeDelta: 0.005,
        }, 1000);
    };

    
    const handleRegionChange = (region) => {
        setMapRegion(region);
    };

    useEffect(() => {
        const getCurrentLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                const address = await Location.reverseGeocodeAsync({ latitude, longitude });
                const formattedAddress = `${address[0].name}, ${address[0].street}, ${address[0].city}, ${address[0].region} ${address[0].postalCode}, ${address[0].country}`;
                setMapRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.030,
                    longitudeDelta: 0.005,
                });
                setMarkerCoordinate({ latitude, longitude });
                setMarkerAddress(formattedAddress);
                onAddressChange(formattedAddress);
            } catch (error) {
                console.log('Error:', error);
            }
        };
    
        getCurrentLocation();
    }, []);

    if (!mapRegion) {
        return null;
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    ...markerCoordinate,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onRegionChangeComplete={handleRegionChange}
                onPress={handleMapPress}
            >
                <Marker coordinate={markerCoordinate} title='Marker' />
            </MapView>
            <Text style={styles.addressText}>{markerAddress}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '75%',
    },
    addressText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default Map