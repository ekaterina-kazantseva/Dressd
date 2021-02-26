import React, {useState, useContext} from 'react';
//import * as firebase from 'firebase';
//import 'firebase/firestore';
import clothesData from '../clothesData.js'; 
import ClosetComponent from '../components/ClosetComponent.js';

//const db = firebase.firestore();

//useContext to pass functionality 2 levels down

export default function ClosetContainer() {

	const [categoriesState, setNewCategories] = useState(clothesData);

	const __changeCategories = (newSubCategories, index) => {
		const newCategories = [...categoriesState];
		newCategories[index] = { ...newCategories[index], group: newSubCategories };
		setNewCategories(newCategories);
	}

	return(
		<ClosetComponent data={categoriesState} onChangeCategories={(newSubCategories, index) => __changeCategories(newSubCategories, index)}/>
	);
};