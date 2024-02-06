import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [password,setPassword] = useState("")
  let [charAllowed,setcharAllowed]=useState(false)
  let [numberAllowed,setnumberAllowed]=useState(false)
  let [length,setLength]=useState(8)
  let [button,setbutton]=useState("COPY")
  let [bd,setbd]=useState(null)


  const passwordgenerator = useCallback(()=>{
    let pass=""
    let str="QWERTYUIOPASDFGHKLZXCVBNMqwertyiuopasdfghklzxcvbm"
    if(numberAllowed) str += "1234567890"
    if(charAllowed)str += "~`!@#$%^&*()_+{}|:;'[]\.,></?"
    for (let i=1; i<=length; i++) {
      let char = Math.floor(Math.random() * str.length+1);
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,charAllowed,numberAllowed,setPassword])
let txt
const copypasstoclipboard=useCallback(()=>{
  passwordref.current?.select()
  
  window.navigator.clipboard.writeText(password)
  clickbutton()
},[password])

const clickbutton=useCallback(()=>{
  setbutton('COPIED!')
    changebd()
},[copypasstoclipboard])
const changebd=useCallback(()=>{
  setbd(100)
},[clickbutton])
  const passwordref=useRef(null)



  useEffect(()=>{
    passwordgenerator()
  },[length,numberAllowed,charAllowed,passwordgenerator])
  return (
    <>
    <div className="bg-slate-900 w-full h-screen shadow-md rounded-lg flex  justify-center text-black">
      <div className="bg-gray-700 mt-10 rounded-xl" style={{padding:20,height:150}}>
      <div className="flex flex-row">
        <input type="text"
        value={password} 
        className='w-full px-4 my-2 py-2 rounded-lg'
        placeholder='Password'
        readOnly
        ref={passwordref}
        
        />
        <button 
        onClick={copypasstoclipboard}
        className={`outline-none bg-blue-400 hover:bg-blue-700  text-white  rounded-lg mx-1  px-4 my-2 shrink-0`}
        id='copy' style={{width:changebd}}>
          {button}
        </button>
        
        
        
      </div>
      <div className='flex flex-wrap justify-centre text-sm gap-x-2 mt-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={8}
            max={999}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}/>
            <label className='text-white'>Length:{length}</label>
            
            <div className='px-2'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{
              setnumberAllowed((prev) => !prev)
            }}
            >

            </input>
            <label htmlFor="numberInput" className='text-white'>Number</label>
          </div>
          <div >
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id='characterInput'
            onChange={()=>{
              setcharAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="characterInput" className='text-white'>Characters</label>
          </div>

          </div>
          
        </div>
   
    </div>
    
      </div>
      
    </>
  )
}

export default App
