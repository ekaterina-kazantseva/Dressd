ct, {useContext, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import ClosetImage from '../../assets/closet.png';
import LooksImage from '../../assets/looks.png';
import CalendarImage from '../../assets/calendar.png';
import firebase from "firebase";
import {AuthContext} from '../../App.js';


const HomeScreen = ({navigation}) => {  

	const { signOut } = useContext(AuthContext);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress = {() => signOut()}><Text style={{fontFamily: 'montserrat-regular', color: 'black', fontSize: 18, margin: 5}}>Sign Out</Text></TouchableOpacity>
			)
		});
	}, [navigation]);

	return (
		<View style={{backgroundColor: '#fff', flex: 1}}>
				<TouchableOpacity onPress = {() => navigation.navigate('Closet')} style={style.buttonStyle}>
					<ImageBackground source={ClosetImage} style={style.image}>
						<Text style={style.text}>Closet</Text>
					</ImageBackground>
				</TouchableOpacity>
				<TouchableOpacity onPress = {() => navigation.navigate('Looks')} style={style.buttonStyle}>
					<ImageBackground source={LooksImage} style={style.image}>
						<Text style={style.text}>Looks</Text>
					</ImageBackground>
				</TouchableOpacity>
				<TouchableOpacity onPress = {() => navigation.navigate('Calendar')} style={style.buttonStyle}>
					<ImageBackground source={CalendarImage} style={style.image}>
						<Text style={style.text}>Calendar</Text>
					</ImageBackground>
				</TouchableOpacity>
		</View>
	);
};

const style = StyleSheet.create({
	buttonStyle: {
		marginBottom: 10,
		padding: 0,
		width: '100%',
		height: '32%',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontFamily: 'montserrat-bold',
		alignSelf: 'center',
		color: '#fff',
		fontSize: 30,
		textShadowRadius: 10,
		textShadowColor: '#000'
	}
});


export default HomeScreen;
