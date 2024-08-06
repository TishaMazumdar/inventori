"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { authContext } from "./auth-context";

export const pantryContext = createContext({
    item: [],
    category: [],
    addItem: async () => { },
    removeItem: async () => { },
    addCategoryItem: async () => { },
    addCategory: async () => { },
    deleteCategory: async () => { },
})

export default function PantryContextProvider({ children }) {
    const [item, setItem] = useState([]);
    const [category, setCategory] = useState([]);

    const {user} = useContext(authContext);

    const addCategory = async (cgy) => {
        try {
            const collectionRef = collection(db, 'category')
            const docSnap = await addDoc(collectionRef, {
                uid: user.uid,
                ...cgy,
                items: [],
            });

            setCategory(prevCategory => {
                return [
                    ...prevCategory,
                    {
                        id: docSnap.id,
                        uid: user.uid,
                        items: [],
                        ...cgy
                    }
                ]
            })

        } catch (error) {
            throw error
        }
    }

    const addCategoryItem = async (categoryId, newCategory) => {
        const docRef = doc(db, "category", categoryId)
        try {
            await updateDoc(docRef, { ...newCategory })

            // Update State
            setCategory(prevState => {
                const updatedCategory = [...prevState]
                const foundIndex = updatedCategory.findIndex(category => {
                    return category.id === categoryId
                })

                updatedCategory[foundIndex] = { id: categoryId, ...newCategory }
                return updatedCategory;
            })
        } catch (error) {
            throw error
        }
    }

    const deleteCategory = async (categoryId) => {
        try {
            const docRef = doc(db, "category", categoryId)
            await deleteDoc(docRef)

            setCategory((prevCategory) => {
                const updatedCategory = prevCategory.filter(
                    (cgy) => cgy.id != categoryId
                );
                return [...updatedCategory];
            })

        } catch (error) {
            throw error
        }
    }

    const addItem = async (newItem) => {
        const collectionRef = collection(db, 'item')

        try {
            const docSnap = await addDoc(collectionRef, newItem)

            // Update state
            setItem((prevState) => {
                return [
                    ...prevState,
                    {
                        id: docSnap.id,
                        ...newItem,
                    },
                ];
            });
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }

    const removeItem = async (itemId) => {
        const docRef = doc(db, 'item', itemId)
        try {
            await deleteDoc(docRef);
            setItem((prevState) => {
                return prevState.filter((i) => i.id != itemId)
            })
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }
    const values = { item, category, addItem, removeItem, addCategoryItem, addCategory, deleteCategory }

    useEffect(() => {
        if (!user) return;

        const getItemData = async () => {
            const collectionRef = collection(db, 'item')
            const q = query(collectionRef, where("uid",'==',user.uid))

            const docsSnap = await getDocs(q)

            const data = docsSnap.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })

            setItem(data);
        }

        const getCategoryData = async () => {
            const collectionRef = collection(db, 'category')
            const q = query(collectionRef, where("uid",'==',user.uid))

            const docsSnap = await getDocs(q)

            const data = docsSnap.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })

            setCategory(data);
        }

        getItemData();
        getCategoryData();
    }, [user])

    return <pantryContext.Provider value={values}>
        {children}
    </pantryContext.Provider>
}