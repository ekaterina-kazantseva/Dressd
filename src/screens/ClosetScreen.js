import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import SubCategories from '../library/components/SubCategories';

let topsCategories = [
	{ name: 'Shirts', isExpanded: false},
	{ name: 'T-Shirts', isExpanded: false},
	{ name: 'Sweaters', isExpanded: false},
	{ name: 'Blazers', isExpanded: false}
]

let botsCategories = [
	{ name: 'Pants', isExpanded: false},
	{ name: 'Shorts', isExpanded: false},
	{ name: 'Skirts', isExpanded: false},
]

let accsCategories = [
	{ name: 'Scarfs', isExpanded: false},
	{ name: 'Bags', isExpanded: false},
	{ name: 'Purses', isExpanded: false},
	{ name: 'Jewelry', isExpanded: false}
]

let shoesCategories = [
	{ name: 'Sneakers', isExpanded: false},
	{ name: 'Pumps', isExpanded: false},
	{ name: 'Stilletos', isExpanded: false},
	{ name: 'Boots', isExpanded: false}
]

let dressRompersCategories = [ { name: 'Dresses', isExpanded: false} ]

const allCategories = [
	{group: topsCategories, name: "Tops", isExpanded: false},
	{group: botsCategories, name: "Bottoms", isExpanded: false},
	{group: accsCategories, name: "Accessories", isExpanded: false},
	{group: shoesCategories, name: "Shoes", isExpanded: false},
	{group: dressRompersCategories, name: "Dresses and Rompers", isExpanded: false}
	]


export default function ClosetScreen() {
	
	const [buttonState, setButtonState] = useState([])
	const [categoriesState, setNewCategories] = useState(allCategories)

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
		if(allCategories.length > 0) {
			const initialState = allCategories.map(item => item.isExpanded)
			setButtonState(initialState)
		}
	}, [allCategories]);

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
