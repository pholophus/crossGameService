import { Fluence, KeyPair } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { registerICrossGameService } from './_aqua/crossGame_service';
import { crossGameService } from './service/crossGame-service';

const relay = krasnodar[7];
const skBytes = 'HWtw8BwinnA4vg/aR1uCUkC7sn8Ec+QGzl5ry/3+Wgo==';

export async function runServer() {
    await Fluence.start({
        connectTo: relay,
        KeyPair: await KeyPair.fromEd25519SK(Buffer.from(skBytes, 'base64')),
    });

    //12D3KooWKkTd9Wkw7jxBbXWNRgRw9qaxmuK2PJW5bv3beHSKueLt

    registerICrossGameService(new crossGameService());

    console.log('application started');
    console.log('peer id is: ', Fluence.getStatus().peerId);
    console.log('relay address: ', relay.multiaddr);
    console.log('relay is: ', Fluence.getStatus().relayPeerId);

    // console.log(`location port ---> ${location.port}`);

    // try{
    //     console.log(`enter get nfts ---> 71fadaada85ba16e14c7ea9c2b28377da15fbce8cf637cf714e364db95280b12`)
    //     return await get_user_nfts("71fadaada85ba16e14c7ea9c2b28377da15fbce8cf637cf714e364db95280b12")

    // }catch(e){
    //     return e
    // }

}