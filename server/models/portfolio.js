;'use strict';

var mongoose = require('mongoose'),
    config = require('../configs/config'),
    Schema = mongoose.Schema;

var Portfolio = new Schema({
    title: {type: String, trim: true},
    type: {type: String, trim: true, default: 'design'},
    img: {type: String, required: true, trim: true},
    file:{type:String, required: true,trim: true},
    createdAt: {type: Date},
    link: {type: String},
    description:{type:String,trim: true}
});





module.exports = mongoose.model('Portfolio',Portfolio);