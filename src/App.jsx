import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Observations from './Observations'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Observations />
    </>
  )
}

export default App
