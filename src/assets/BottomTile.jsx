import React from 'react'

function BottomTile({ title, info }) {
  return (
    <div className="bg-slate-600 flex-col bg-opacity-70 rounded-xl w-40 h-40 flex justify-center items-center">
        <p className="text-center">{title}</p>
        <p className='font-bold py-3'>{info}</p>
    </div> 
  )
}

export default BottomTile