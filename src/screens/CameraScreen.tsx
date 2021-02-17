import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {Camera} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default CameraView = () => {
	const [startCamera, setStartCamera] = React.useState(null);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [capturedImage, setCapturedImage] = useState(null);
	
	let camera: Camera;

	const __takePicture = async () => {
	if (!camera) return;
	const photo = await camera.takePictureAsync();
	console.log(photo);
	setPreviewVisible(true);
	setCapturedImage(photo);
	};

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

	const CameraPreview = ({photo, retakePicture, savePhoto}: any) => {
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

	useEffect(() => {
		(async() => {
			const { status } = await Camera.requestPermissionsAsync();
			setStartCamera(status == 'granted');
		})();
	}, []);

	if (!startCamera) {
		return <Text>Access Denied</Text>;
	}
	if (startCamera === null) {
		return <View />;
	}

	 if(startCamera) {
			if (previewVisible && capturedImage) {
				return (
					<CameraPreview 
					photo={capturedImage}
					savePhoto={__savePhoto}
					retakePicture={__retakePicture} 
					/>
				);
			}
			return (
			<Camera
				style={{flex: 1, width: "100%"}}
				ref={(r) => {camera = r}}
				>
				<View
				style={{
					flex: 1,
					width: '100%',
					backgroundColor: 'transparent',
					flexDirection: 'row'
				}}
				>
					<View
					style={{
						position: 'absolute',
						bottom: 0,
						flexDirection: 'row',
						fles: 1,
						width: '100%',
						padding: 20,
						justifyContent: 'space-between'
					}}>
						<View
						style={{
							alignSelf: 'center',
							flex: 1,
							alignItems: 'center'
						}}>
							<TouchableOpacity
							onPress={__takePicture}
							style={{
								width: 70,
								height: 70,
								bottom: 0,
								borderRadius: 50,
								backgroundColor: '#fff'
							}}
							/>
						</View>
					</View>
				</View>
			</Camera>
				);
		}
}
