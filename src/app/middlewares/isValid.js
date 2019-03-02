/**
 *          .::VALIDATION::.
 * All validation operations belong here.
 *
 */
import validator from 'validator';
import _ from 'lodash';
/**
 * Returns a json object that has `foundKeys` and `notFoundKeys`
 * @param {*} object
 * @param {*[]} keys keys to find in `object`
 */
let findKeys = (object, keys) => {
	var foundKeys = [];
	var notFoundKeys = [];
	keys.forEach(key => {
		notFoundKeys.push(key);
		_.mapKeys(object, (objectValue, objectKey) => {
			if (key == objectKey) {
				if (object[key] && object[key] != null && object[key] != "" || object[key] == false) {
					foundKeys.push(key);
					notFoundKeys.pop();
				}
			}
		});
	});
	return {
		foundKeys,
		notFoundKeys
	};
};
let deepOmit = (object, keys) => {
	try {
		if (object._doc) object = object._doc;

		let mapper = o => {
			if (Object.keys(o).length > 0) var level = deepOmit(o, keys);
			else var level = o;
			return level;
		};
		keys.map(okey => {
			_.mapKeys(object, (v, k) => {
				if (okey == k) delete object[k];
			});
		});
		var newObject;
		if (object.length) return object.map(mapper);
		else {
			Object.keys(object).map(key => {
				object[key] = mapper(object[key]);
			});
			return object;
		}
	} catch (e) {
		return object;
	}
};
/**
 * request validation
 * @param requiredKeys {string[]} Keys that are required in req.body
 * @param forbiddenKeys {string[]} Keys that are not allowed to be in req.body
 *
 */
export function req(requiredKeys, forbiddenKeys) {
	var req = this;
	var { res } = req;
	var { body } = req;
	if (!requiredKeys) requiredKeys = [];
	if (!forbiddenKeys) forbiddenKeys = [];

	var missedKeys = findKeys(body, requiredKeys).notFoundKeys;
	var notAllowedKeys = findKeys(body, forbiddenKeys).foundKeys;

	var error = "";
	if (missedKeys.length > 0)
		error =
			"The following keys are required in request body:\n " +
			_.join(missedKeys, " , ") +
			"\n";
	if (forbiddenKeys.length > 0)
		error =
			"The following keys are forbidden in request body:\n" +
			_.join(forbiddenKeys, " , ") +
			"\n";

	if (error == "") return true;
	res.validSend(400, {
		error
	});
	return false;
}
/**
 *
 * @param {number} status http status code
 * @param {*} body response body
 * @param {string[]} omitKeys Optional - keys to omit from response body
 */
export function res(status, body, omitKeys) {
	if (!status) status = 200;
	if (body)
		if (validator.isJSON(JSON.stringify(body))) {
			if (body._doc) body = body._doc;

			var defaultOmitKeys = ["__v"];
			if (!omitKeys || omitKeys.length <= 0) omitKeys = defaultOmitKeys;
			body = deepOmit(body, omitKeys);
		}
	if (status == 200) console.log("RESPONSE > ", 200, " : ", body);
	else console.error("RESPONSE > ", status, " : ", body);
	return this.status(status).json(body);
}

export default {
	req,
	res
};
