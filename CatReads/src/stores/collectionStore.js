import {db} from "$lib/firebase/firebase.client.js";
import {getDocs, collection, addDoc, where, query, updateDoc, doc, increment, getDoc} from "firebase/firestore";

export const getBooks = async () => {
    const querySnapshot = await getDocs(collection(db, "Books"));

    let booksArr = []
    querySnapshot.forEach((doc) => {
        booksArr = [...booksArr, {id: doc.id, ...doc.data()}]
    });

    return booksArr;
}

export const addToCart = async (uid, bookId, inc) => {
    let item = await checkItemInCart(uid, bookId)

    if (!item) {
        await addDoc(collection(db, 'Carts'), {
            itemId: bookId,
            quantity: 1,
            uid: uid
        })
    } else {
        const existingItemRef = await doc(db, "Carts", item.id)
        await updateDoc(existingItemRef, {
            quantity: increment(inc)
        })
    }
}

const checkItemInCart = async (uid, bookId) => {
    let items;

    try {
        items = []
        const q = await query(collection(db, "Carts"), where('uid', '==', uid), where('itemId', '==', bookId))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            items = [...items, {id: doc.id, ...doc.data()}]
        })
    } catch (err) {
        console.log(err)
    }

    if (items.length === 0) {
        return false
    } else {
        return items[0]
    }
}

export const checkQuantity = async (uid, bookId) => {
    let item = await checkItemInCart(uid, bookId)
    if (!item) return 0
    else return item.quantity
}

export const getCartItems = async (uid) => {
    let items;
    console.log(uid)

    try {
        items = []
        const q = await query(collection(db, "Carts"), where('uid', '==', uid))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            items = [...items, {id: doc.id, ...doc.data()}]
        })
    } catch (err) {
        console.log(err)
    }

    return items
}