import React from 'react';
import { useState } from 'react'
import './App.css'
import { API_URL } from './api';

//component
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <InputTodo/>
    <ListTodo/>
    </>
  )
}

export default App
