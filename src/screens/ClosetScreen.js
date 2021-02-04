import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Camera} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function ClosetScreen() {
	const [startCamera, setStartCamera] = React.useState(false);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [capturedImage, setCapturedImage] = useState(null);
	
	let camera: Camera;

	const __startCamera = async () => {
		const {status} = await Camera.requestPermissionsAsync();
		if(status === 'granted') {
			setStartCamera(true);
		}else {
			Alert.alert("Access denied");
		}
	};

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

	return (
		<LinearGradient
		colors={['#f97794', '#623AA2']}
		style={{
			flex: 1,
			alignItems: 'center',
		}}
		start={{ x: 0, y: 0}}
		end={{ x: 1, y: 1}}
		>
			<TouchableOpacity
				onPress={__startCamera}
				style={style.addNewButton}>
					<Text style={{fontFamily: 'Helvetica', 
					fontWeight: 'bold', 
					alignSelf: 'center',
					fontSize: 38,
					color: '#623AA2'}}>+</Text>
				</TouchableOpacity>
			<View 
			style={{marginTop: 80}}>
				<TouchableOpacity 
				style={style.buttonStyle}>
					<Text style={style.textStyle}>Tops</Text>
				</TouchableOpacity>
				<TouchableOpacity
				style={style.buttonStyle}>
					<Text style={style.textStyle}>Bottoms</Text>
				</TouchableOpacity>
				<TouchableOpacity
				style={style.buttonStyle}>
					<Text style={style.textStyle}>Accesories</Text>
				</TouchableOpacity>
				<TouchableOpacity
				style={style.buttonStyle}>
					<Text style={style.textStyle}>Shoes</Text>
				</TouchableOpacity>
			</View>
		</LinearGradient>
	);
};

const style = StyleSheet.create({
	buttonStyle: {
		marginTop: 40,
		padding: 25,
		backgroundColor: 'white',
		width: 125,
		borderRadius: 10,
	},
	addNewButton: {
		borderRadius: 25,
		backgroundColor: 'white',
		width: 50,
		height: 50,
		position: 'absolute',
		alignSelf: 'flex-start',
		marginTop: 25,
		marginLeft: 15
	},
	textStyle: {
		fontFamily: 'Helvetica', 
		fontWeight: 'bold', 
		alignSelf: 'center',
		color: '#623AA2'
	}
});

//export default ClosetScreen;