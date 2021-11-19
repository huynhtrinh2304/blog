const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: { type: String, maxLength: 255, require: true },
    description: { type: String },
    img: { type: String },
    videoId: { type: String, require: true },
    category: { type: String, require: true },
    slug: { type: String, slug: 'name', unique: true },
}, {
    _id: true,
    timestamps: true,
}, );




// Add plugins
mongoose.plugin(slug);

CourseSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('Course', CourseSchema);