import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const HomeScreen = ({navigation}) => {
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
			<Text style={{fontFamily: 'Helvetica', fontWeight: 'bold', alignSelf: 'center', marginTop: 50, color: 'white', fontSize: 80}}>MyLook</Text>
			<View 
			style={{marginTop: 80}}>
				<TouchableOpacity 
				onPress = {() => navigation.navigate('Closet')}
				style={style.buttonStyle}>
					<Text style={{fontFamily: 'Helvetica', fontWeight: 'bold', alignSelf: 'flex-start', color: '#623AA2'}}>Closet</Text>
				</TouchableOpacity>
				<TouchableOpacity
				onPress = {() => navigation.navigate('Looks')}
				style={style.buttonStyle}>
					<Text style={{fontFamily: 'Helvetica', fontWeight: 'bold', alignSelf: 'flex-start', color: '#623AA2'}}>Looks</Text>
				</TouchableOpacity>
			</View>
		</LinearGradient>
		
	);
};

const style = StyleSheet.create({
	buttonStyle: {
		marginTop: 40,
		padding: 20,
		backgroundColor: 'white',
		width: 225,
		borderRadius: 10,
	}
});

export default HomeScreen;