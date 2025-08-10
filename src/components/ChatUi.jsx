import React from 'react'

const ChatUi = ({setUserText ,userText}) => {
 
  return (
  
<div className='absolute w-full md:w-2/3 h-[71vh] overflow-y-auto left-1/2 -translate-x-1/2 top-0 flex flex-col gap-1'>
{
  userText.map(ele => (
  <div key={ele.id} className={ele.sender === 'user' ? 'text-right' : 'text-left'}>
    <p className={ele.sender === 'user'?'inline-block px-3 py-2 text-white bg-black rounded-full text-[13px] md:text-2xl':'inline-block text-[13px] md:text-2xl px-3 py-2 text-black'}>
      {typeof ele.text === 'string' ? ele.text : JSON.stringify(ele.text)}
    </p>
  </div>
))
  
}

</div>
  )
}

export default ChatUi