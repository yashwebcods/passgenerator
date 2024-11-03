import { useState , useCallback , useEffect} from 'react'
import './App.css'

function App() {
  const [length , setlength] = useState(5) // to get the legth of password 
  const [number , setNumber] = useState(false) // to allow a number show in password 
  const [character , setCharacter] = useState(false) // to allow a character show in password 
  const [password , setPassword] = useState("") // actual value of password which show in inpur files
  const [color , setcolor] = useState("blue") // to set color in copy button


  const generator =  useCallback( () => { 
    let pass = "" 
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    if(number) str += "123456789"  
    if(character) str += "!@#$%^&*()_+{}[]"

    for(let i=0 ; i <= length ; i++){
        let char = Math.floor(Math.random() * str.length + 1 ) // by this line we got a rendom index number of str 
        
         pass += str.charAt(char) // by this line we get index value of tha char like 0 inde = A
    }

    setPassword(pass)
  } , [length , number , character ,setPassword])

  const copyPassword = () => {  // this function use for copy a password text on click
    window.navigator.clipboard.writeText(password);
  }

   const handelClick = useCallback( () => {
    copyPassword()
    setcolor("red")
      
   } , [password , length])// this function use to handle to function onclick
    
  
  
  useEffect( () => { // if any dapenancy are change that thim run this function
    generator()
  } , [length , number , character ,setPassword])
  return (
    <>
      <div className='flex justify-center mt-4'>
          <div className='h-40 bg-black rounded-xl'>
              <div className='text-white text-center p-5'>
                  
                  <input value={password} type='text' placeholder='password' className='p-1 rounded-l-lg read-only: outline-0 pb-1 text-black'/>
                  <button className='p-1 rounded-r-lg' onClick={handelClick} style={{background:color , backgroundColor:'blue'}}>Copy</button>
              </div>
              <div className='flex justify-center gap-3 '>
                 <span className='text-white'>Lenghth {length}</span>   
                  <input className='cursor-pointer text-white' type='range' min={6} max={99} defaultValue='8'  onChange={(e) => setlength(e.target.value)}/>
                  <span className='text-white'>number</span>
                  <input type='checkbox' value={number} onChange={() => setNumber(!number)}/>
                  
                  <span className='text-white'>Charactor</span>
                  <input type='checkbox' value={character} onChange={() => setCharacter(!character)}/>

              </div>
          </div>
      </div>
    </>
  )
}

export default App
