import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import FileUploader from "react-firebase-file-uploader"
import { FirebaseContext } from "../firebase/context"
import Swal from 'sweetalert2'


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
    height: 400px;
    object-fit: cover;
    max-width: 100%;
    transform: rotate(${props => props.transform || 0}deg);
    -webkit-box-shadow: 0px 0px 27px 3px rgba(140,136,140,1);
    -moz-box-shadow: 0px 0px 27px 3px rgba(140,136,140,1);
    box-shadow: 0px 0px 27px 3px rgba(140,136,140,1);
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
    const { firebase, mainImage, setMainImage } = useContext(FirebaseContext);

    // Declaraciones para la subida de imágenes
    const [imageName, setImageName] = useState("")
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

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
                const newImage = { url, transform: 0, createdAt: new Date() }
                firebase.db.collection('imagenesKustovi').add(newImage)
                    .then(data => { setMainImage({ ...newImage, id: data.id }) })
            }
            )
    }

    const rotate = (rotate) => {
        if (mainImage) {
            if (rotate === 'left') {
                const finishDegrees = mainImage.transform - 90 >= 360 ? 0 : mainImage.transform - 90
                firebase.db.collection('imagenesKustovi').doc(mainImage.id).update({
                    transform: finishDegrees
                })
                setMainImage({ ...mainImage, transform: finishDegrees })
            }
            else if (rotate === 'right') {
                const finishDegrees = mainImage.transform + 90 >= 360 ? 0 : mainImage.transform + 90
                firebase.db.collection('imagenesKustovi').doc(mainImage.id).update({
                    transform: finishDegrees
                })
                setMainImage({ ...mainImage, transform: finishDegrees })
            }
        }
    }

    const removeImage = () => {
        if (mainImage) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No se podrá revertir esta acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, bórralo!',
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.value) {
                    firebase.db.collection("imagenesKustovi").doc(mainImage.id).delete()
                        .then(function () {
                            setMainImage("")
                            Swal.fire(
                                'Borrado!',
                                'La imagen ha sido borrada',
                                'success'
                            )
                        }).catch(function (error) {
                            Swal.fire(
                                'Hubo un error al borrar la imagen',
                                'Póngase en contacto con el administrador',
                                'error'
                            )
                        });
                }
            })
        }

    }


    return (
        <Upload>
            {mainImage ? <Image src={mainImage.url} transform={mainImage.transform} alt="imagen principal" className="form-image" /> : <Image src="/img/default.png" alt="imagen temporal" className="form-image" />}
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
            <div className="d-flex justify-content-center align-items-center mt-3">
                <Button onClick={() => rotate('left')}>Izquierda</Button>
                <svg onClick={() => removeImage()} width="10em" height="2em" viewBox="0 0 16 16" className="bi bi-trash" fill="tomato" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer" }}>
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg>
                <Button onClick={() => rotate('right')}>Derecha</Button>
            </div>
        </Upload>
    );
}

export default MainImage;