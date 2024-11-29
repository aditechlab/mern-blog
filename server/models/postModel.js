const { Schema, model } = require('mongoose') 

//define table columns
const postSchema = new Schema({
    title: {type: String, required: true},
    category: {type: String, enum: ["Agriculture","Business","Education","Entertainment","Art","Investment","Uncategorized",
        "Weather"], message: "Value is not supported"},
    description: {type: String, required: true},
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    image: {type: String},
}, {timestamps: true})

module.exports = model('Post', postSchema);