"use client"
import Appbar from "@/components/Appbar/Appbar";
import PopupModal from "@/components/PopupModal/PopupModal";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Registration=()=>{
    const session:any=useSession();
    const router=useRouter();
    useEffect(()=>{
        if(session.data?.user?.isauthenticated)
        {
          //  console.log("session user is present")
            router.replace("/");
        }
        else{
           // console.log("else")
        }
    },[session])

    const [registrationForm,setRegistrationForm]=useState({
        "username":"",
        "password":""
    })
    const[showRegistrationModal,setShowRegistrationModal]=useState(false);
    const handleFormSubmission=async()=>{
        try{
            const response=await fetch("/api/registration",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({registrationForm})
            }) 
            const data=await response.json();
          //  console.log("data",data)
            if(data.response=="success")
            {
                router.push("/");
            }
            else if(data.response=="user already exists")
            {
                setShowRegistrationModal(true);
            }
            else{
                console.error("failed auth")
            }
        }
        catch(err)
        {
            console.error(err);
        }
    }
    const handleRegistrationForm=(e:any)=>{
        try{
     //       console.log("change",e.target.value)
            setRegistrationForm((prev)=>({
                ...prev,
                [e.target.name]:e.target.value
            }))
        }
        catch(err)
        {
            console.error("err");
        }
    }
    return (
        <div>
            <Appbar/>
            {showRegistrationModal && 
              <PopupModal
              showModal={showRegistrationModal}
              setShowModal={setShowRegistrationModal}
              message={"user with this username already exists"}
              />
            }
          
            <form className="m-auto w-[35vw] mt-[5rem] ">
                <div className="flex flex-col p-[1rem]  justify-center items-center border-white border-[1px]">
                    <h2 className="text-white font-bold text-2xl">Sign Up</h2>
                <div className="m-[3rem]">
                <label htmlFor="username" className="text-white font-semibold">Username</label>
                <input onChange={(e)=>{
                    handleRegistrationForm(e)
                }}
                value={registrationForm.username} type="text" name="username" id="username" className="ml-[2rem]  outline-none bg-transparent text-white border-white border-b-[1px]"/>
                </div>
                <div className="m-5">
                <label htmlFor="password" className="text-white font-semibold">Password</label>
                <input onChange={(e)=>{
                    handleRegistrationForm(e)
                }} value={registrationForm.password} type="password" name="password" id="password" className="ml-[2rem] outline-none bg-transparent text-white border-white border-b-[1px]"/>
                </div>
                <button type="button" className="text-white  text-center font-semibold mt-[1rem] rounded p-2 hover:bg-white hover:text-black "
                onClick={handleFormSubmission}
                >Submit</button>
                 <div className="text-white text-sm font-semibold mt-2">
                    <p>Already have an account ? <span className="underline cursor-pointer" onClick={()=>{
                        signIn();
                    }}>Sign In</span></p>
                </div>
                </div>
               
                
            </form>
        </div>
    );
}
export default Registration;