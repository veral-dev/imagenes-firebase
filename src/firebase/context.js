import React, { createContext, useState, useEffect } from 'react';
import firebase from "./firebase"


export const FirebaseContext = createContext()

const FirebaseProvider = props => {
    const [mainImage, setMainImage] = useState("")
    const [images, setImages] = useState(null)
    useEffect(() => {
        const getImages = async () => {
            await firebase.db.collection("imagenesKustovi").orderBy("createdAt", "desc").onSnapshot(handleSnapshot)
        }
        getImages()

    }, [])


    function handleSnapshot(snapshot) {
        const imagesFirebase = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        setImages(imagesFirebase)
    }

    return (

        <FirebaseContext.Provider
            value={{
                firebase,
                mainImage,
                images,
                setMainImage,
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}
export default FirebaseProvider
