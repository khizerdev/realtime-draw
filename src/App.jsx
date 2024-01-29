import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import DrawingPad from './components/drawing-pad';

function App() {
  return (
    <section className="relative h-full">
      <Navbar />
      <DrawingPad />
    </section>
  );
}

export default App;
