/**
 *          .::TOKENIZATION::.
 * Generating, Verifying and all related operations to Token are here.
 * 
 */
import User from '../models/User';

//TOKEN CONFIGURATION
/**
 *  basedCollection: Name of the schema that token is generating from it.
 *  useridKey: Name of the field that userid is stored there in the told collection
 * 
 * Example: {
 *      collection: 'Device',
 *      useridKey: 'userid'
 *  } 
 * This example generates token based on user's Device.
 */
let config = {
    basedCollection: 'User',
    useridKey: '_id'
}

let validationConfig = () => {
    if (!config) return {
        valid: false,
        error: "config is not defined"
    }
    if (!config.basedCollection) return {
        valid: false,
        error: "collection name is not defined"
    }
    if (!config.useridKey) return {
        valid: false,
        error: "userid key is not defined"
    }
    return {
        valid: true
    }

}
//GENERATING TOKEN
/**
 *  @param {string} userid User unique identifier
 *  @param {string} docid Optional- Unique Identifier of basedCollection's document that is related to user. If it's null, this function will find it in database automatically. 
 */
export default async(userid, docid) => {
    //CHECKING TOKENIZATION CONFIG
    var validation = validationConfig();
    if (!validation.valid) return {
        error: validation.error
    };
    var {
        basedCollection,
        useridKey
    } = config;
    //IF BASEDCOLLECTION IS USER, USERID AND _ID SHOULD BE SAME.
    if (basedCollection == 'User') return await jwt.sign({
        userid,
        basedCollection,
        _id: userid
    },process.env.JWT_SECRET);
    let schema = mongoose.model(basedCollection);
    //IF DOCID IS NOT DEFINED, FIND IT IN BASEDCOLLECTION
    if (!docid) {
        let doc = await schema.findOne({
            [useridKey]: userid
        });
        if (!doc) return {
            error: "No " + basedCollection + "'s document with passed " + useridKey + " was found."
        }
        docid=doc._id;
    }
    //GENERATING TOKEN
    return await jwt.sign({
        userid,
        basedCollection,
        docid
    },process.env.JWT_SECRET);

}
//VERIFYING TOKEN
export let verify=async(token)=>{
    try{
        //VERIFYING
        var authenticationInfo=await jwt.verify(token,process.env.JWT_SECRET);
        var {basedCollection,userid,docid} =authenticationInfo;
        //FINDING USER OBJECT
        var user=await User.findById(userid);
        var result={user};

        if(basedCollection!='User'){
        //FINDING BASEDCOLLECTION DOCUMENT
        var schema=mongoose.model(basedCollection);
        var doc=await schema.findById(docid);
        result[basedCollection]=doc;
        }
        //RETURNING FOUND OBJECTS
        return result
        
    }catch(e){
        //INVALID TOKEN
        return {error:"Token is not valid."}
    }

}

