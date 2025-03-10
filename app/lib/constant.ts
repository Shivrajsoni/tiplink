// // export async function getSupporteTokens(){

// import { Connection } from "@solana/web3.js"
// import axios from "axios";
// import { SUPPORTED_TOKENS } from "./token";
// export const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/T0a2jUFAXvqn3dc4Q22m92mMiclu33C4");

// let LAST_UPDATED_TIME : null | number = null;

// const TOKEN_FRESH_REFRESH_INTERVAL = 60*1000;

// let prices: {[key: string]: {
//     price: string;
// }} = {};


// export async function getSupportedTokens(){
//     if(!LAST_UPDATED_TIME || new Date().getTime() - LAST_UPDATED_TIME < TOKEN_FRESH_REFRESH_INTERVAL){
//         try {
//             const responses = await axios.get("https://price.jup.ag/v6/price?ids=SOL,USDC,USDT");
//              prices = responses.data.data;
//             LAST_UPDATED_TIME = new Date().getTime();
//         } catch (error) {
//             console.log(error);
//         }
//         return SUPPORTED_TOKENS.map(s=>({
//             ...s,
//             price:prices[s.name].price
//         }))
//     }
// }

// getSupportedTokens();

import { Connection } from "@solana/web3.js";
import axios from "axios";
import { SUPPORTED_TOKENS } from "./token";

let LAST_UPDATED: number | null = null;
let prices: {[key: string]: {
    price: string;
}} = {};

const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000; // every 60s

export const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/EspGgEsKtp6xdG1-P32lj9raEFUlgXNc");

export async function getSupportedTokens() {
    if (!LAST_UPDATED || new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL) {
        try {
            const response = await axios.get("https://price.jup.ag/v6/price?ids=SOL,USDC,USDT");
            prices = response.data.data;
            LAST_UPDATED = new Date().getTime();
        } catch(e) {
            console.log(e);
        }
    }
    return SUPPORTED_TOKENS.map(s => ({
        ...s,
        price: prices[s.name].price
    }))

}

getSupportedTokens();