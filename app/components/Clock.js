import { Date1, Digits, Digits1, Digits2 } from "./Digits"

const Clock = () => {
  return (
    <div className="mx-auto h-screen w-full flex items-center justify-center text-white">
      <div className="relative flex items-center justify-center">
      <div className=" absolute h-6 w-[170px] border-[2px] rounded-3xl -right-2 border-white"></div>
      <div className="btn z-[-1] gradient rotate-90 border-2  rounded-full border-violet-950 -z-1"><Digits/></div>
      <div className=" gradient1 absolute rotate-90 border-2  rounded-full border-violet-950 -z-1"><Digits1/></div>
      <div className=" gradient2 absolute rotate-90 border-2  rounded-full border-violet-950 -z-1"><Digits2/></div>
      <div className="absolute"><Date1 /></div>
      </div>
      
    </div>
  )
}
export default Clock