"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

export default function FarmerChat(){
    useEffect(()=>{
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL)
  socket.on('connect', () => {
    console.log('Connected to the server');
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });
  return () => {
    socket.disconnect();
  }  
    },[])

    return (
        <div>
            socket test
        </div>
    )
}