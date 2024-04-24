import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
  const[length,setLength]=useState(8)
  const[numberAllow,setAllow]=useState(false)
  const[char,setChar]=useState(false)
  const[password,setPassword]=useState("")

  //use ref hook
  const passwordRef =useRef(null)

  const passwordGenerator =useCallback(()=>
    {let pass=""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz"
    if(numberAllow) str+="0123456789"
    if(char) str += "!@#$%^&*-_+=[]{}~`"


  for (let i= 1; i <= length; i++) {
    let char =Math.floor(Math.random() * str.length +1);
    pass += str.charAt(char)
  }
  setPassword(pass)
  
  },[length,numberAllow,char,setPassword])

  const copyPasswordToClibBoard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password )
  },[password])

  useEffect(()=>{
    passwordGenerator()},
    [length,numberAllow,char,passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 text-center '>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type='text'
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClibBoard}>Copy</button>

        
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}} />
          <label>length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllow}
          id="numberInput"
          onChange={()=>
            {setAllow((prev)=>!prev)}
          } />
          <label htmlFor="numberInput">Numbers</label>

        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={char}
          id="charInput"
          onChange={()=>
            {setChar((prev)=>!prev)}
          } />
          <label htmlFor="charInput">Characters</label>

        </div>

      </div>


      </div>
    </>
  )
}

export default App
