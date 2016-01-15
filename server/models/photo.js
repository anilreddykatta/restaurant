/**
 * Created by anilkatta on 1/13/16.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PhotoSchema = new Schema({
	image : {data: Buffer, contentType: String, required: false},
	title: {type: String, required: false},
	thumbnail : {data: Buffer, contentType: String, required: false},
	name: {type: String, required: false},
	url : {type: String, required: false},
	description : {type: String, required: false}
});


module.exports = mongoose.model("Photo", PhotoSchema);
