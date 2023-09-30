import { useState } from 'react'
import './App.css'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  let [numberAllowed, setNumberAllowed] = useState(false)
  let [charallowed, setCharallowed] = useState(false)

  const [password, setPassword] = useState('')


  const PasswordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ZXCVBNMLKJHGFDSAQWERTYUIOPzxcvbnmlkjhgfdsaqwertyuiop';

    if (numberAllowed) {
      str = str + '123456789'
    }
    if (charallowed) {
      str = str + '@#$%^&*'
    }
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charallowed, setPassword])

  const passwordRef = useRef(null)

  const coppyPassword=()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }


  useEffect(() => {
    PasswordGenerator()
  }, [length, numberAllowed, charallowed, setPassword, PasswordGenerator])

  return (
    <>
      <div className="w-96 rounded-xl p-4 mx-auto border-2    ">
        <h3 className="text-3xl ">Password genarator</h3>
        <input value={password} ref={passwordRef} readOnly className='outline-none rounded-s p-1' type="text" />
        <button onClick={coppyPassword} className='px-4 py-1 rounded-none border-none rounded-e-2xl my-5 bg-slate-400 text-black shrink-1'>Coppy</button>
        <div className="flex justify-around">
          <input type="range" min={6} max={12} onChange={(e) => setLength(e.target.value)} value={length} />
          <label htmlFor="number">{length}</label>
          <span>
            <input type="checkbox" onChange={() => setNumberAllowed(prev => !prev)} />
            <label htmlFor="number">Number</label>
          </span>

          <span>
            <input type="checkbox" onChange={() => setCharallowed(prev => !prev)} />
            <label htmlFor="Symble">Symble</label>
          </span>


        </div>
      </div>
    </>
  )
}

export default App
