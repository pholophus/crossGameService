import { CallParams } from "@fluencelabs/fluence";
import { ICrossGameServiceDef } from "../_aqua/crossGame_service";
// import { ArcadeDetail, StatusMessage, LocationDetail } from "../interface";
import mongodb from '../database/mongodb.database';
// import {AssetMetadataModule} from '../modules/assetMetadata.module'
// import * as driver from 'bigchaindb-driver'
// import * as zoneGameDetail from "../data/zoneGameDetail.json";
// import { ObjectId } from 'mongodb'
import {Weapons} from '../interface';


export class crossGameService implements ICrossGameServiceDef {

    async registration(walletAddress: string): Promise<void> {

        try{
            const mongo = new mongodb()

            await mongo.connectDB()

            const profileMetadata = await mongo.profileMetadata()

            let userDetail = await profileMetadata.findOne({
                walletAddress: walletAddress
            })

            console.log("user detail ",userDetail)

            if(userDetail == null){
                console.log("masuk")
                await profileMetadata.insertOne({
                    walletAddress: walletAddress,
                    listNFT: [],
                    character: {
                        weapon: ""
                    }
                })
            }

        }catch(e){
            console.log(e)
        }
    }

    async readMetadata(contractAddress: string, tokenId: string): Promise<string> {

        let weapon: string = ""

        console.log("masuk func")
        try{

            let covalent = `https://api.covalenthq.com/v1/137/tokens/${contractAddress}/nft_metadata/${tokenId}/?quote-currency=USD&format=JSON&key=ckey_4ee3ec1f67124382b348c2cd13c`
            
            // let covalent = "https://api.covalenthq.com/v1/137/tokens/0x03e055692e77e56abf7f5570d9c64c194ba15616/nft_metadata/23833/?quote-currency=USD&format=JSON&key=ckey_4ee3ec1f67124382b348c2cd13c"

            await fetch(covalent)
            .then(resp => resp.json())
            .then(repos => {
                
                weapon = repos.data.items[0].nft_data[0].external_data.image

                console.log(weapon)
            }).catch(err => {
                console.error(err);
            })

        }catch(e){
            console.log(e)
        }

        return weapon
    }

    async updateCharacter (walletAddress: string, weapon: string): Promise<void>{

        try{

            const mongo = new mongodb()

            await mongo.connectDB()

            const profileMetadata = await mongo.profileMetadata()

            await profileMetadata.updateOne({
                walletAddress: walletAddress
            }, {
                $set: {
                    "character.weapon" : weapon
                }
            })

        }catch(e){
            console.log(e)
        }
    }

    async buyWeapon (walletAddress: string, weapon: string): Promise<boolean>{

        let status = false;

        try{

            const mongo = new mongodb()

            await mongo.connectDB()

            const profileMetadata = await mongo.profileMetadata()

            console.log("wallet address", walletAddress)
            let userDetail = await profileMetadata.findOne({
                walletAddress: walletAddress
            })

            console.log(userDetail)

            if(!userDetail.listNFT.includes(weapon)){

                await profileMetadata.updateOne({
                    walletAddress: walletAddress
                }, {
                    $push: { listNFT: weapon }
                })

                status = true
            }else{
                console.log("weapon already exist")
            }

        }catch(e){
            console.log(e)
        }

        return status

    }

    async getCurrentWeapon(walletAddress: string): Promise<string>{
        
        
        let currentWeapon: string = "";

        try{

            const mongo = new mongodb()

            await mongo.connectDB()

            const profileMetadata = await mongo.profileMetadata()

            let userDetail = await profileMetadata.findOne({
                walletAddress: walletAddress
            })

            currentWeapon = userDetail.character.weapon

        }catch(e){
            console.log(e)
        }

        return currentWeapon;
    }

    async getInventory(walletAddress: string): Promise<Weapons>{

        console.log("current weapon", walletAddress)
        
        let listNFT: Weapons = {
            length: -1,
            weapon: []
        }

        try{

            const mongo = new mongodb()

            await mongo.connectDB()

            const profileMetadata = await mongo.profileMetadata()

            let userDetail = await profileMetadata.findOne({
                walletAddress: walletAddress
            })

            console.log(userDetail.listNFT)

            if(userDetail.listNFT.length > 0){
                listNFT.length = 0
                listNFT.weapon.push(userDetail.listNFT)
            }

        }catch(e){
            console.log(e)
        }

        console.log("listnft",listNFT)

        return listNFT

    }
    
}