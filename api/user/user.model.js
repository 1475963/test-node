'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true }
});

/*
 *  I can add validators here to check each field content according to a spec
 */

module.exports = {
  attributes: [ 'name', 'age' ],
  model: mongoose.model('user', userSchema)
}
