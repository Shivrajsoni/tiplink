"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
            <Assets publicKey = {publicKey}/>
            {JSON.stringify(session.data?.user)}
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

function Assets({publicKey}:{publicKey:string}){
    return <div>
        <p>Public Key </p>
        {publicKey}
    </div>
}

function Greeting({image,name}:{image:string,name:string}){
    return <div className="flex p-12">
        <img src = {image} className="rounded-full w-16 h-16 mr-4" alt = "Profile Picture"/>
        <div className="text-2xl font-semibold flex flex-col justify-center">Welcome back , {name} </div>
    </div>
}