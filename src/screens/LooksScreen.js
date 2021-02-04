import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const LooksScreen = () => {
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
				style={style.addNewButton}>
					<Text style={{fontFamily: 'Helvetica', 
					fontWeight: 'bold', 
					alignSelf: 'center',
					fontSize: 38,
					color: '#623AA2'}}>+</Text>
				</TouchableOpacity>
		</LinearGradient>
		
	);
};

const style = StyleSheet.create({
	addNewButton: {
		borderRadius: 25,
		backgroundColor: 'white',
		width: 50,
		height: 50,
		position: 'absolute',
		alignSelf: 'flex-start',
		marginTop: 25,
		marginLeft: 15
	}
});

export default LooksScreen;