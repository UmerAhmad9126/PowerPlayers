import React, { useEffect, useState } from "react";
import { MdOutlineContentCopy } from 'react-icons/md';


const Room = () => {
  const [user, setUser] = useState(true)

  const handleUserChange = () => {
    setUser(!user)
  }

  useEffect(() => {
    handleUserChange()
  }, [])





  const handleStartGame = () => {
    console.log("Starting game...");
  };

  return (
    <div className="mb-20">
      <div>
        <h1 className="text-white mt-10 text-4xl mb-10 font-bold">READY FOR BATTLE?</h1>
        <div className="border-4 w-96 p-10 py-20 m-auto shadow-2xl">
          <h3 className="text-white text-2xl mb-10 font-bold">PICK A COLOR 🔥</h3>
          <div className="grid grid-cols-2 w-44 gap-10 place-items-center m-auto">
            <div className="h-12 w-12 rounded cursor-pointer shadow-2xl bg-red-500 hover:bg-red-700"></div>
            <div className="h-12 w-12 rounded cursor-pointer shadow-2xl bg-yellow-500 hover:bg-yellow-700"></div>
            <div className="h-12 w-12 rounded cursor-pointer shadow-2xl bg-green-500 hover:bg-green-700"></div>
            <div className="h-12 w-12 rounded cursor-pointer shadow-2xl bg-sky-500 hover:bg-sky-700"></div>
          </div>

        </div>
        <button className="mt-10 border-2 bg-white p-2 rounded shadow-2xl">Ready! 🏴‍☠️</button>

        {
          user ? <div className="border-2 w-96 m-auto my-10 p-6 shadow-2xl">
            <div>Invite your friend...</div>
            <div className="flex text-white text-2xl place-content-center place-items-center">
              <p className="mr-3 font-medium">Room Code: <span id="copyText">XXXX</span></p>
              <button className="cursor-pointer">
                <MdOutlineContentCopy />
              </button>
            </div>
          </div> :
            <div className="border-2 w-96 m-auto my-10 p-6 bg-white shadow-2xl">
              <div className="text-red-500  text-3xl p-2 font-medium">Chunnu (You)</div>
              <div>V/S</div>
              <div className="text-blue-500  text-3xl p-2 font-medium">Munnu</div>
              <div>or</div>
              <button onClick={handleUserChange} className="text-black font-thin text-lg underline-offset-1">invite new friend</button>
            </div>
        }
        <div className="flex place-content-center ">
          <button className="border-2 bg-yellow-500 p-2 rounded mr-5 shadow-2xl">◀️ Back</button>
          <button onClick={handleStartGame} className="border-2 bg-green-500 p-2 rounded shadow-2xl">Start Battle 💀</button>
        </div>


      </div>
    </div>
  );
};


export default Room;

