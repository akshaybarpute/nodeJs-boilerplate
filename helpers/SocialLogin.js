'use strict';
const request = require('request-promise');

exports.getUserInfo= async(token,mode)=>{

    if(!token || !mode){
        throw Error('token or mode missing');
    }

    try{
    if(mode=='google'){

        const uri = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
        var options = {
            uri: uri,
            method: 'GET',
            json:true
        };

        const data = await request(options);

        console.log('user data: ', data);

        return data;
    }
    else if(mode=='facebook'){

        const uri = `https://graph.facebook.com/v6.0/me?fields=id,name,email&access_token=${token}`
        var options = {
            uri: uri,
            method: 'GET',
            json:true
        };

        const data = await request(options);

        console.log('user data: ', data);

        return data;
    }
        }
        catch(err){
            console.log('error: ', err.message, err.stack);
            throw Error('error while fetching user login info')
        }
}
