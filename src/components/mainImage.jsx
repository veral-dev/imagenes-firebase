import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import FileUploader from "react-firebase-file-uploader"
import { FirebaseContext } from "../firebase/context"


const Upload = styled.div`
    width: 300px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
`

const Image = styled.img`
margin: 2rem auto;
width: 300px;
max-width: 100%
`

const Button = styled.button`
width: 100%;
padding: 10px 0;
border-radius: 10px;
background-color: ${props => props.bgColor || "white"};
text-transform: uppercase;
font-weight: bold;
`

const SelectImageBox = styled.label` 
  padding: 15px 0;
  width: 100%;
  background-color: ${props => props.bgColor || "white"};
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  color: black
  `



const MainImage = () => {
    const { firebase } = useContext(FirebaseContext);

    // Declaraciones para la subida de imágenes
    const [imageName, setImageName] = useState("")
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState("")
    const [error, setError] = useState(false)


    const handleUploadStart = () => {
        setUploading(true);
        setProgress(0);
    }

    const handleProgress = progress => setProgress({ progress });

    const handleUploadError = error => {
        setUploading(error);
    }


    const handleUploadSuccess = name => {

        setProgress(100);
        setUploading(false);
        setImageName(name)
        firebase
            .storage
            .ref("kustovi")
            .child(name)
            .getDownloadURL()
            .then(url => {
                setImageUrl(url)

            })
    }

    return (
        <Upload>
            {imageUrl ? <Image src={imageUrl} alt="imagen temporal" className="form-image" /> : <Image src="/img/default.png" alt="imagen temporal" className="form-image" />}
            <SelectImageBox bgColor="#fdd100">
                Subir imagen
                    <FileUploader
                    hidden
                    accept="image/*"
                    id="image"
                    name="image"
                    randomizeFilename
                    storageRef={firebase.storage.ref("kustovi")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress} />
            </SelectImageBox>
            <h6 className="text-center text-uppercase mt-3">Girar imagen</h6>
            <div className="row">
                <div className="col-md-6"><Button >Izquierda</Button></div>
                <div className="col-md-6"><Button>Derecha</Button></div>
            </div>
        </Upload>
    );
}

export default MainImage;