import { getServerSession } from "next-auth";
import ProfileCard from "../component/profileCard";
import { authConfig } from "../lib/auth";
import db from "../db";
import { error } from "console";


async function getUserWallet(){

    const session = getServerSession(authConfig);
    const userWallet = await db.solWallet.findFirst({
        where:{
            userId: (await session)?.user?.uid
        },
        select:{
            publicKey:true
        }
    })

    if(!userWallet){
        return {
            error:"No solana wallet found associated to the user"
        }
    }
    return {error:null,userWallet};
}


export default async function Dashboard(){
    const userWallet = await getUserWallet();
    if(userWallet.error || !userWallet.userWallet?.publicKey){
        return <p>No Solana Wallet Found</p>
    }
    return <div>
        <ProfileCard publicKey={userWallet.userWallet.publicKey} />
    </div>
}