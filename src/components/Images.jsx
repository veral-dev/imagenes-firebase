import React, { useContext } from 'react'
import { FirebaseContext } from "../firebase/context"
import styled from 'styled-components'

const Image = styled.img`
    margin: 2rem auto;
    width: 140px;
    height: 180px;
    object-fit: cover;
    max-width: 100%;
    transform: rotate(${props => props.transform || 0}deg);
    -webkit-box-shadow: 0px 0px 27px 3px rgba(140,136,140,1);
    -moz-box-shadow: 0px 0px 27px 3px rgba(140,136,140,1);
    box-shadow: 0px 0px 27px 3px rgba(140,136,140,1);
    transition: 0.5s;
    cursor: pointer;
:hover{
    -webkit-box-shadow: 0px 0px 27px 12px rgba(140,136,140,1);
    -moz-box-shadow: 0px 0px 27px 12px rgba(140,136,140,1);
    box-shadow: 0px 0px 27px 12px rgba(140,136,140,1);
}
`


const Images = () => {
    const { images, setMainImage } = useContext(FirebaseContext);

    return (
        <div className="my-5 row">

            {images && images.map((elm, index) => (
                <div key={index} className="col-6 col-md-4 col-lg-2 d-flex justify-content-center">
                    <Image onClick={() => setMainImage(elm)} src={elm.url} transform={elm.transform} alt={index} />
                </div>
            ))}

        </div>

    );
}

export default Images;