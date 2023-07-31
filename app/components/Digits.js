"use client"
import { useEffect, useState } from "react"

export const Digits = () => {
  const letters = []
  const date = new Date()
  const [sec, setsec] = useState(0)
  useEffect(() => {
    const s = setInterval(() => {
      setsec(date.getSeconds())
    })
    return () => clearInterval(s)
  })

  
  
  
  for(let i=0;i<60;i++)
    letters[i] = (sec+i)%60
  
  return (
    <div className="text text-[15px] h-[600px] w-[600px]  rounded-full flex relative justify-center">
      <div className="">
      {letters.map((ch, i) => {
        return(
          <span id={`id${i}`} key={i} style={{transform: `rotate(${i*6}deg); transform-origin: 0 300px;`}} className=" absolute origintl ">{ch}</span>
        )
        
      })}
      </div>
     
    </div>
  )
}

export const Digits1 = () => {
  const letters = []
  const date = new Date()
  const [hour, sethour] = useState(0)
  useEffect(() => {
    setInterval(() => {
      sethour(date.getHours())
    },);
  })
  for(let i=0;i<12;i++)
    letters[i] = (hour+i)%12

  return (
    <div className="text1 text-[15px] h-[350px] w-[350px] rounded-full flex relative justify-center">
      
      <div className="">
      {letters.map((ch, i) => {
        return(
          <span key={i} style={{transform: `rotate(${i*30}deg)`}} className=" absolute origintl1 font-bold text-xl">{ch}</span>
        )
        
      })}
      </div>
    </div>
  )
}

export const Digits2 = () => {
  const letters = []
  const date = new Date()
  const getMinutes = date.getMinutes() - 1
  for(let i=0;i<60;i++){
    letters[i] = (getMinutes+i+1)%60
  }

  return (
    <div className="text2 text-[15px] h-[500px] w-[500px]  rounded-full flex relative justify-center">
      <div className="">
      {letters.map((ch, i) => {
        return(
          <span key={i} style={{transform: `rotate(${i*6}deg)`}} className=" absolute origintl2 ">{ch}</span>
        )
        
      })}
      </div>
    </div>
  )
}

export const Date1 = () => {
    const date = new Date()
    const [dateInside, setDateInside] = useState({
      day: date.getDay(),
      month: date.getMonth(),
      year: date.getFullYear(),
    })
    return(
      <div className="text-5xl">{dateInside.day}:{dateInside.month}:{dateInside.year}</div>
    )
}
