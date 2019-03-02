/**
 *          .::EXPRESS PLUGINS::.
 * Express plugins and all adding data to req and res are here.
 * 
 */
import isValid from './isValid';
export default (req, res, next)=> {
	validators(req,res);

	next();
}
//ADDING REQUEST AND RESPONSE VALIDATORS TO REQUEST
let validators=(req,res)=>{
	res.validSend=isValid.res;
	req.res=res;
	req.validate=isValid.req;
	
	
}