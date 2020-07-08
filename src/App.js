import React from 'react';
import './App.css';
import MainImage from "./components/mainImage"
import Images from "./components/Images"
import styled from "styled-components"
import Container from "@material-ui/core/Container"
import FirebaseProvider from "./firebase/context"

const Main = styled.main`
margin: 2rem auto
`
const Title = styled.h1`
text-transform: uppercase;
text-align: center;
`


function App() {
  return (
    <FirebaseProvider>
      <Main>
        <Title>Rotación de imágenes</Title>
        <Container>
          <MainImage />
          <Images />
        </Container>
      </Main>
    </FirebaseProvider>
  );
}

export default App;
