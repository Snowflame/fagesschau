/**
* Video.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

	date: {
		type: 'date'
	},
	videoid: {
		type: 'string'
	},
	length: {
		type: 'integer'
	},
	title: {
		type: 'string'
	},
	resort: {
		type: 'string'
	},
	chapter: {
		collection: 'chapter',
		via: 'videos'
	}
  }
};

