import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import SubCategories from '../library/components/SubCategories';
import * as firebase from 'firebase';
import 'firebase/firestore';
import clothesData from '../library/clothesData.js';


export default function ClosetScreen() {
	
	const [buttonState, setButtonState] = useState([])
	const [categoriesState, setNewCategories] = useState(clothesData)

	const __changeCategories = (newSubCategories, index) => {
		const newCategories = [...categoriesState];
		newCategories[index] = { ...newCategories[index], group: newSubCategories };
		setNewCategories(newCategories);
	}

	const handlePress = (state, idx) => {
		const newArr = [...state]
		newArr[idx] = !newArr[idx]
		setButtonState(newArr)
	}

	useEffect(() => {
		if(clothesData.length > 0) {
			const initialState = clothesData.map(item => item.isExpanded)
			setButtonState(initialState)
		}
	}, [clothesData]);

	return (
			<View 
			style={{backgroundColor: '#fff', flex: 1}}>
				{categoriesState.map((item, idx) => <>
					<TouchableOpacity
						style={style.buttonStyle}
						onPress = {() => handlePress(buttonState, idx)}>
						<Text style={style.textStyle}>{item.name}</Text>
					</TouchableOpacity>
					<SubCategories showSubCategories={buttonState[idx]} categories={categoriesState[idx].group}
					onChangeCategories={(newSubCategories, index) => __changeCategories(newSubCategories, index)} index={idx}/>
				</>
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
