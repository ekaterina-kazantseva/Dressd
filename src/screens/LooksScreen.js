import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const LooksScreen = () => {
	return (
		<View style={{backgroundColor: '#75A9D9', flex: 1}}>
			<TouchableOpacity style={style.addNewButton}>
				<Text style={{fontFamily: 'Helvetica',
					fontWeight: 'bold',
					alignSelf: 'center',
					fontSize: 38,
					color: '#000'}}>+</Text>
			</TouchableOpacity>
		</View>
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
