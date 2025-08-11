import React ,{useState ,useEffect ,useRef}from 'react'
import { IoAdd } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { WiStars } from "react-icons/wi";
import { CiLocationArrow1 } from "react-icons/ci";
import { BsMic } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { useForm } from "react-hook-form"
import { io } from "socket.io-client";
import ChatUi from './ChatUi';


const Chat = () => {


  const [userText, setUserText] = useState([]) 
    const [text, setText] = useState("");

  const recognitionRef = useRef(null);




  const [socket, setsocket] = useState()
   const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { message: "" }
  })
useEffect(() => {
const socketIns = io("https://aichat-z74b.onrender.com/", {
  transports: ['websocket'], // optional, recommended for production
});
setsocket(socketIns)
socketIns.on("ai_response" , (res)=>{
  const botMessage ={
    id:Date.now() + 1,
    text:res,
    timestamp:new Date().toLocaleDateString(),
    sender:'bot'
  }
setUserText(prev => [...prev, botMessage])

})
console.log(userText)
 return () => {
    socketIns.disconnect();
  };
}, [])


  const onSubmit = (data)=>{
    if(data.message.trim() === '') return

const userMessage ={
  id:Date.now(),
  text:data.message,
  timestamp: new Date().toLocaleDateString(),
  sender:"user"
}

setUserText(prev => [...prev, userMessage])
   socket.emit("message" , data.message)
   setText("")
    
  }

const michanddler = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition.");
    return;
  }

  // Agar pehle se instance nahi bana to banayein
  if (!recognitionRef.current) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Hindi ke liye "hi-IN"
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
    };

    recognitionRef.current = recognition;
  }

  try {
    recognitionRef.current.start();
  } catch (error) {
    console.warn("Recognition already started.");
  }
};

  return (
    <div className='w-[100%] h-[100%] bg-[#E2E4F3] rounded-4xl flex overflow-hidden'>
<div className='hidden w-20 bg-[#E2E4F3] rounded-s-4xl sm:flex flex-col items-center pt-5 gap-2'>
  <button className='w-10 h-10 rounded-full flex justify-center items-center  text-white text-2xl bg-black'><IoAdd /></button>
  <button className='w-10 h-10 rounded-full flex justify-center items-center  text-black text-3xl bg-white overflow-hidden pt-3'><FaUser /></button>
  </div> 
<div className='flex-1  rounded-4xl overflow-hidden  bg-white bg-[radial-gradient(at_top_left,rgba(219,234,254,0.5)_0%,transparent_60%),radial-gradient(at_bottom_right,rgba(240,171,252,0.5)_0%,transparent_60%)] bg-no-repeat bg-cover'>
<nav className='w-full h-20 flex  justify-between items-center px-5 md:px-10'>
  <p className='text-md hidden sm:inline'>Assistant v2.5</p>
 <p className='text-xl font-bold uppercase'>Textra</p>
 
 <button className='flex items-center capitalize text-white bg-black text-[12px] md:text-sm justify-center gap-1 rounded-full p-1 sm:w-35 sm:h-10'><WiStars />upgrade</button>
</nav>
<main className="overflow-hidden w-full h-[calc(100%-80px)] relative ">
  <div className='w-2/3 left-15 sm:left-20 md:left-70 top-20 relative'>
  {
    userText.length==0?  <p className='text-4xl sm:text-5xl md:text-6xl capitalize absolute z-5 tracking-tighter'><span className='text-black/50'> hi textra,</span> ready to<br/> achieve great things?</p>
:''
  }
  </div>
<div className='absolute w-[80%] md:w-2/3 h-[65vh] md:h-[71vh] overflow-y-auto left-1/2 -translate-x-1/2 top-0 flex flex-col gap-1 '>
<ChatUi userText={userText} setUserText={setUserText}/>

</div>
  
<form action="" onSubmit={handleSubmit(onSubmit)}>
<div className='absolute w-[80%] md:w-2/3 h-12 sm:h-15 md:h-20 left-1/2 -translate-x-1/2 bottom-10 '>
<div className='absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-8 h-4 md:w-10  md:h-5 flex justify-center items-center  text-black/80 text-xl md:text-2xl border-r-2  border-black/80  cursor-pointer'><GoPlus /></div>
<input
  type="text"
  {...register("message", { required: true })}
  value={text}
  onChange={(e) => {
    setText(e.target.value);      
    setValue("message", e.target.value); 
  }}
  className='outline-0 ps-12 sm:ps-15 md:ps-20 pe-28 w-full h-full rounded-full border-1 border-black/20 shadow-xl placeholder:text-sm md:placeholder:text-xl capitalize placeholder:tracking-tight placeholder:text-black/50'
  placeholder='How can I help you today ?'
/>
<button className='absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8  sm:h-8 md:w-10  md:h-10 flex justify-center items-center bg-black text-white sm:text-xl md:text-2xl rounded-full cursor-pointer'><CiLocationArrow1 /></button>
<div className='absolute right-10 sm:right-15 md:right-17 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8  sm:h-8 md:w-10  md:h-10 flex justify-center items-center border-1 border-black/20 shadow bg-white text-black sm:text-xl md:text-2xl rounded-full cursor-pointer' onClick={michanddler}><BsMic />
</div>
</div>
</form>
</main>
</div>
    </div>
  )
}

export default Chat