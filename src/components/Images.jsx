import React, { useContext, useState } from 'react'
import { FirebaseContext } from "../firebase/context"



const Images = () => {
    const [images, setImages] = useState([])

    const { firebase } = useContext(FirebaseContext);

    const storageList = firebase.storage.ref('kustovi')

    storageList.listAll().then(result => {
        console.log(result.items)
    })

    return (
        <div className="my-5">

            {/* {images.map(elm => (elm.location.path))} */}
        </div>

    );
}

export default Images;