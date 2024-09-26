import { useState } from 'react'
import './App.css'
import TestSupabase from './components/TestSupabase'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TestSupabase />
    </>
  )
}

export default App
