import React, { createContext } from 'react';
import firebase from "./firebase"


export const FirebaseContext = createContext()

const FirebaseProvider = props => {

    return (

        <FirebaseContext.Provider
            value={{
                firebase,
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}
export default FirebaseProvider
