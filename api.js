import { initializeApp } from 'firebase/app'
import {
	getFirestore,
	collection,
	getDocs,
	doc,
	getDoc,
	query,
	where,
} from 'firebase/firestore/lite'

const firebaseConfig = {
	apiKey: 'AIzaSyDeO17QtYTXvOKMZPFetmPrdnq8_zX6gH0',
	authDomain: 'caravanlife-b05f6.firebaseapp.com',
	projectId: 'caravanlife-b05f6',
	storageBucket: 'caravanlife-b05f6.appspot.com',
	messagingSenderId: '194000771622',
	appId: '1:194000771622:web:7dc17ccf3cd48228f924e7',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const vansCollectionRef = collection(db, 'caravans')

export async function getVans() {
	const querySnapshot = await getDocs(vansCollectionRef)
	const dataArr = querySnapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}))
	return dataArr
}

export async function getVan(id) {
	const docRef = doc(db, 'caravans', id)
	const vanSnapshot = await getDoc(docRef)
	return {
		...vanSnapshot.data(),
		id: vanSnapshot.id,
	}
}

export async function getHostVans() {
	const q = query(vansCollectionRef, where('hostId', '==', '123'))
	const querySnapshot = await getDocs(q)
	const dataArr = querySnapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}))
	return dataArr
}

export async function loginUser(creds) {
	const res = await fetch('/api/login', {
		method: 'post',
		body: JSON.stringify(creds),
	})
	const data = await res.json()

	if (!res.ok) {
		throw {
			message: data.message,
			statusText: res.statusText,
			status: res.status,
		}
	}

	return data
}
