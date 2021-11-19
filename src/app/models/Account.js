const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');



const AccountSchema = new Schema({
    username: { type: String, maxLength: 255, require: true },
    fullname: { type: String },
    password: { type: String, maxLength: 255, require: true },
    who: { type: String },
    avatar: { type: String },


});



AccountSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });
module.exports = mongoose.model('Account', AccountSchema);