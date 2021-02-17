import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Button, TextInput } from 'react-native';

export default SubCategories = ({showSubCategories, categories, onChangeCategories, index}) => {
	const [expandList, setExpandList] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [inputValue, setInputValue] = useState('')

	const navigation = useNavigation();
	useEffect(() => {
		if(categories.length > 0) {
			const initialState = categories.map(item => item.isExpanded)
			setExpandList(initialState)
		}
	}, [categories]);

	const handlePress = (state, idx) => {
		const newArr = [...state]
		newArr[idx] = !newArr[idx]
		setExpandList(newArr)
	}

	const __addCategory = () => {
		setShowModal(true)
	}

	const submitNewCategory = () => {
		const newCategoryName = inputValue
		const newCategories = [...categories, { name: inputValue, isExpanded: false }]
		onChangeCategories(newCategories, index)
		setShowModal(false)
	}

	if (showSubCategories) {
		return (<View>
			<Modal isVisible={showModal} animationType="slide" transparent>
				<View style={{height: 200, width: 300, backgroundColor: 'white', alignSelf: 'center'}}>
					<Text>Name New Category</Text>
					<TextInput placeholder="Name of new category" style={{ height: 40, borderColor: 'gray', borderWidth: 1}}
							   onChangeText={text => setInputValue(text)}
							   value={inputValue}/>
					<Button title="Cancel" onPress={() =>{setShowModal(false)}}/>
					<Button title="OK" onPress={() => {submitNewCategory()}}/>
				</View>
			</Modal>
			{categories.map((item, idx) => (
				<>
				<TouchableOpacity onPress={() => handlePress(expandList, idx)}>
				<Text style={style.subMenuText}>{item.name}</Text>
				</TouchableOpacity>

				{expandList[idx] && <FlatList showsHorizontalScrollIndicator={false} horizontal
				data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }, { key: 'e' }, { key: 'f' }]}
											  renderItem={({item, index}) => (<View style={style.renderItem}>
												  <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
													  {index == 0 && <Text style={style.subMenuText}>+Add New Item</Text>}
												  </TouchableOpacity>
											  </View>)}/> }
				</>
				))}

			<TouchableOpacity onPress={() => __addCategory()}>
				<Text style={style.subMenuText}>+Add New Category</Text>
			</TouchableOpacity>
			</View>)
	}

	return null
}

const style = StyleSheet.create({
	subMenuText: {
		fontFamily: 'roboto-light',
		fontSize: 20,
		color: 'rgba(0,0,0,0.5)',
		paddingLeft: 20,
		paddingTop: 5
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
	}
});