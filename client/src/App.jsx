import { useState } from 'react';
import React from "react";
import {NextUIProvider} from "@nextui-org/react";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css'
import Playlist from './components/playlist';

function App() {
  return (  
      <Playlist/>
  )
}

export default App
