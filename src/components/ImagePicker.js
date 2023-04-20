import React, { useState } from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const GetImage = ({ onImageSelected }) => {
    const [image, setImage] = useState(null);
    
    const pickImage = async (fromCamera) => {
        let result;
        if (fromCamera) {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        }

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            onImageSelected(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Take a picture" onPress={() => pickImage(true)} />
                <Button title="Select from camera roll" onPress={() => pickImage(false)} />
            </View>
            {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        width: '80%',
    },
    image: {
        width: '80%',
        height: 200,
        resizeMode: 'cover',
        marginVertical: 20,
        borderRadius: 10,
    },
});
export default GetImage;
