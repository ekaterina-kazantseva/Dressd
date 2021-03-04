import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Button, TextInput } from 'react-native';

export default SubCategories = ({showSubCategories, subCategories, onChangeSubCategories, index}) => {
	//State array for toggling visibility of clothing items
	const [expandList, setExpandList] = useState([])
	//State for toggling Add New Category modal
	const [showModal, setShowModal] = useState(false)
	//State for changing New Category input
	const [inputValue, setInputValue] = useState('')

	//Navigation for switching to Camera to add new item
	const navigation = useNavigation();
	
	//Setting initial states for subcategories to not show their contents
	useEffect(() => {
		if(subCategories.length > 0) {
			const initialState = subCategories.map(item => item.isExpanded)
			setExpandList(initialState)
		}
	}, [subCategories]);

	//Handle press for subcategories to toggle showing their contents
	const handlePress = (state, idx) => {
		const newArr = [...state]
		newArr[idx] = !newArr[idx]
		setExpandList(newArr)
	}
	
	//Create new subcategory and add it to corresponding category
	const submitNewSubCategory = () => {
		const newSubCategoryName = inputValue
		const newSubCategories = [...subCategories, { name: inputValue, isExpanded: false }]
		onChangeSubCategories(newSubCategories, index)
		setShowModal(false)
	}
	
	//If category is set to show its subcategories
	if (showSubCategories) {
		return (<View>
				<Modal isVisible={showModal} animationType="slide" transparent>
					<View style={style.modal}>
						<Text>Name New Subcategory</Text>
						<TextInput placeholder="Name of new subcategory" style={style.input}	//Modal for submitting new subcategory
							   onChangeText={text => setInputValue(text)}
							   value={inputValue}/>
						<Button title="Cancel" onPress={() =>{setShowModal(false)}}/>
						<Button title="OK" onPress={() => {submitNewSubCategory()}}/>
					</View>
				</Modal>
				{subCategories.map((item, idx) => (					
					<>	//renders all subcategories as buttons
						<TouchableOpacity onPress={() => handlePress(expandList, idx)}>
							<Text style={style.subMenuText}>{item.name}</Text>
						</TouchableOpacity>
						//if subcategory is clicked, shows its contents
						{expandList[idx] && 
						 <FlatList showsHorizontalScrollIndicator={false} horizontal
							   data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }, { key: 'e' }, { key: 'f' }]}
							   renderItem={({item, index}) => (
								<View style={style.renderItem}>
									<TouchableOpacity onPress={() => navigation.navigate('Camera')}>
									{index == 0 && <Text style={style.subMenuText}>+Add New Item</Text>}
									</TouchableOpacity>
								</View>
						)}/>}
					</>
				))}
				<TouchableOpacity onPress={() => setShowModal(true)}>
					<Text style={style.subMenuText}>+Add New Subcategory</Text>
				</TouchableOpacity>
		</View>)
	}
	return null //else show nothing
}

const style = StyleSheet.create({
	subMenuText: {
		fontFamily: 'roboto-light',
		fontSize: 20,
		color: 'rgba(0,0,0,0.5)',
		paddingLeft: 20,
		paddingTop: 5,
	},
	renderItem: {
		borderBottomWidth: 1,
		borderRightWidth: 1,
		borderColor: 'rgba(0, 0, 0, 0.13)',
		minWidth: 100,
		maxWidth: 100,
		height: 100,
		maxHeight:100,
		backgroundColor: '#fff',
	},
	modal: {
		height: 200, 
		width: 300, 
		backgroundColor: 'white', 
		alignSelf: 'center',
	},
	input: {
		height: 40, 
		borderColor: 'gray', 
		borderWidth: 1,
	},
});
