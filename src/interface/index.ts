export interface NFTDetail{
    contractAddress: string
    tokenId: string
}
    
export interface NFTs{
    length: number
    nft: NFTDetail[]
}
 
export interface Weapons{ 
    length: number,
    weapon: string[]
}