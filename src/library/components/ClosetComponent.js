import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import SubCategories from './SubCategories';

export default ClosetComponent = ({data, onChangeCategories, index}) => {
	const [buttonState, setButtonState] = useState([])

	useEffect(() => {
		if(data.length > 0) {
			const initialState = data.map(item => item.isExpanded)
			setButtonState(initialState)
		}

	}, [data]);

	const handlePress = (state, idx) => {
		const newArr = [...state]
		newArr[idx] = !newArr[idx]
		setButtonState(newArr)
	}

	return (
		<View style={{flex: 1}}>
			{data.map((item, idx) => <>
				<TouchableOpacity
					style={style.buttonStyle}
					onPress = {() => handlePress(buttonState, idx)}>						
					<Text style={style.textStyle}>{item.name}</Text>
				</TouchableOpacity>
				<SubCategories showSubCategories={buttonState[idx]} categories={data[idx].group}
				onChangeCategories={(newSubCategories, index) => changeCategories(newSubCategories, index)} index={idx}/></>
			)}
		</View>
	);
};

const style = StyleSheet.create({
	buttonStyle: {
		padding: 10,
		backgroundColor: 'white',
		width: '100%',
		alignSelf: 'center',
		borderBottomWidth: 1,
		borderColor: 'rgba(0, 0, 0, 0.13)'
	},
	textStyle: {
		fontFamily: 'montserrat-regular',
		color: '#000',
		fontSize: 20
	},
	subMenuText: {
		fontFamily: 'roboto-light',
		fontSize: 20,
		color: 'rgba(0,0,0,0.5)',
		paddingLeft: 20,
		paddingTop: 5
	}
});