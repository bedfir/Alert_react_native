import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import Map from '../../components/Map';
import GetImage from '../../components/ImagePicker';
import SendMail from '../../components/SendMail';

const App = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [address, setAddress] = useState('');

    const handleAddressChange = (newAddress) => {
        setAddress(newAddress);
    };
    const handleImageChange = (newImage) => {
        setImage(newImage);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.title}>Alert Screen</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={[styles.input, styles.commentInput]}
                multiline={true}
                numberOfLines={4}
                placeholder="Comments"
                value={comment}
                onChangeText={setComment}
            />
            <View style={{height: 300}}>
                <Map onAddressChange={handleAddressChange} />
            </View>
            <GetImage onImageSelected={handleImageChange} />
            <SendMail name={name} email={email} comment={comment} image={image} address={address} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    commentInput: {
        height: 100,
        paddingTop: 10,
    },
});

export default App;
