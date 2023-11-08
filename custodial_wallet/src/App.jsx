import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Top Nav */}
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">myCustodial</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <button className="btn btn-md w-24 md:w-auto">Create Wallet</button>
          </div>
        </div>
      </div>

      <div>

      </div>
    </>
  )
}

export default App
