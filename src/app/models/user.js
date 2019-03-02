import mongoose from 'mongoose';
import mongooseTimestamp from 'mongoose-timestamp';
import Hash from './sensitive/Hash';
import bcrypt from 'bcrypt';

var userSchema = mongoose.Schema({

	username: {
		type: String,
		required: true
	},
});

userSchema.plugin(mongooseTimestamp);
//UPDATING HASH WHEN PASSWORD IS CHANGED
userSchema.virtual('password').set(async function (password) {
	try {
		return await Hash.updateOne({ user: this._id }, { user: this._id, hash: password }, { upsert: true });
		
	} catch (error) {
		console.error(error)	
	}
})

//AUTHORIZE USER
userSchema.statics.authorize = function (user) {
	return new Promise(async function (resolve, reject) {
		try {
			//FINDING HASH
			var savedHash = await Hash.findOne({ user: user._id });
			console.log(savedHash)
			if (!savedHash) return reject("hash was not found");
			//COMPARING PASSWORD AND HASH
			var match = await bcrypt.compare(user.password, savedHash.hash);
			if (match) return resolve(true);
			return resolve(false);
		} catch (e) {
			return reject(e);
		}

	})
}



export default mongoose.model('User', userSchema);