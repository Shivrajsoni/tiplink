"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PrimaryButton } from "./button";

export default function ProfileCard({publicKey}:{publicKey:string}){
    const session = useSession();
    const router = useRouter();

    if(session.status==="loading"){
        return <div>Loading ...</div>
    }
    if(!session.data?.user){
        router.push("/");
        return null;
    }

    return <div className="pt-8 flex justify-center">
        <div className="max-w-4xl bg-white rounded shadow w-full">
            <Greeting 
                image={session.data?.user?.image ?? ""} 
                name={session.data?.user?.name ?? ""} 
            />
            {/* <Assets publicKey = {publicKey}/>
            {JSON.stringify(session.data?.user)} */}
             {/* <div className="w-full flex px-10">
                {tabs.map(tab => <TabButton key={tab.id} active={tab.id === selectedTab} onClick={() => {
                    setSelectedTab(tab.id)
                }}>{tab.name}</TabButton>)}
            </div>
            
            <div className={`${selectedTab === "tokens" ? "visible" : "hidden"}`}><Assets tokenBalances={tokenBalances} loading={loading} publicKey={publicKey} /> </div>
            <div className={`${selectedTab === "swap" ? "visible" : "hidden"}`}><Swap tokenBalances={tokenBalances} publicKey={publicKey} /> </div>
            <div className={`${(selectedTab !== "swap" && selectedTab !== "tokens") ? "visible" : "hidden"}`}><Warning /> </div> */}
        </div> 
    </div>
}

function Assets({publicKey,tokenBalances,loading}:{publicKey:string,tokenBalances:{totalBalance:number,tokens:TokenWithbalance[]}|null,loading:boolean}){

    const [copied,setCopied] = useState(false);
    useEffect(()=>{
        if(copied){
            let timeout = setTimeout(()=>{
                setCopied(false)
            },3000);
            return ()=>{
                clearTimeout(timeout)
            }
        }
    },[copied])

    if(loading){
        return <div>Loading...</div>
    }

    return <div className="text-slate-500">
        <div className="mx-12 py-12">
            Account Assets
        </div>
        <div className="flex justify-center mx-12">
        <div className="flex">
                <div className="text-5xl font-bold text-black">
                    ${tokenBalances?.totalBalance}
                </div>
                <div className="font-slate-500 font-bold text-3xl flex flex-col justify-end pb-0 pl-2">
                    USD
                </div>
                <div>
                <PrimaryButton onClick={() => {
                    navigator.clipboard.writeText(publicKey)
                    setCopied(true)
                }}>{copied ? "Copied" : "Your wallet address"}</PrimaryButton>
                </div>
        </div>
        </div>
{/* 
        <div className="pt-4 bg-slate-50 p-12 mt-4">
            <TokenList tokens={tokenBalances?.tokens || []} />
        </div> */}
        </div>

}

function Greeting({image,name}:{image:string,name:string}){
    return <div className="flex p-12">
        <img src = {image} className="rounded-full w-16 h-16 mr-4" alt = "Profile Picture"/>
        <div className="text-2xl font-semibold flex flex-col justify-center">Welcome back , {name} </div>
    </div>
}