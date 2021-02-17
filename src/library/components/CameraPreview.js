import React, {useState} from 'react';    
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {Camera} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const __retakePicture = () => {
	setCapturedImage(null);
	setPreviewVisible(false);
	__takePicture();
};

const __savePhoto = async () => {
	const {status} = await MediaLibrary.requestPermissionsAsync();
	if(status === 'granted') {
		MediaLibrary.saveToLibraryAsync(capturedImage.uri);
	} else {
		Alert.alert("Access denied");
	}
};

export default CameraPreview = ({photo, retakePicture, savePhoto}: any) => {
  		console.log('sdsfds', photo);
  		return (
   			 <View
      			style={{
        		backgroundColor: 'transparent',
        		flex: 1,
        		width: '100%',
        		height: '100%',
      			}}
    		>
      			<ImageBackground
        			source={{uri: photo && photo.uri}}
        			style={{
          			flex: 1
        			}}
      			/>
      				<TouchableOpacity
      				onPress={__savePhoto}
      				style={{
      					position: 'absolute',
      					bottom: 5,
      					right: 10,
      					backgroundColor: '#fff',
      					borderRadius: 50,
      					width: 90,
      					height: 90,
      					justifyContent: 'center'
      				}}><Text style={{color: '#623AA2', fontSize: 15, fontFamily: 'Helvetica', alignSelf: 'center', fontWeight: 'bold'}}>Save</Text></TouchableOpacity>

   	   				<TouchableOpacity
      				onPress={__retakePicture}
      				style={{
      					position: 'absolute',
      					bottom: 5,
      					left: 10,
      					backgroundColor: '#fff',
      					borderRadius: 50,
      					width: 90,
      					height: 90,
      					justifyContent: 'center'
      				}}><Text style={{color: '#623AA2', fontSize: 15, fontFamily: 'Helvetica', alignSelf: 'center', fontWeight: 'bold'}}>Retake</Text></TouchableOpacity>
    		</View>
  		);
	};
