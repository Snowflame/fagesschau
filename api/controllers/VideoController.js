/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getVideo: function (req, res) {
  	var request = require('request');
  	var http = require('http');
	var fs = require('fs');
  	request('http://www.tagesschau.de/api/multimedia/video/ondemand100_type-video.json', function (error, response, body) {
    	var feedcontent = JSON.parse(body);
    	var vidcount = feedcontent.videos.length;
    	var time = 0;

    	for (var i = 0; i < vidcount; i++) {
    		if(time < 300000){
    			time += feedcontent.videos[i].outMilli;
	    		Video.create({url: feedcontent.videos[i].mediadata[5].h264xl, date:feedcontent.videos[i].date, videoid: feedcontent.videos[i].sophoraId, length: feedcontent.videos[i].outMilli, title: feedcontent.videos[i].headline}).exec(function(error, video){
					video.file = fs.createWriteStream("assets/video/"+video.id+".mp4");
					video.request = http.get(video.url, function(response) {
					  response.pipe(video.file);
					});
	    		});
	    	}
    	};
    	return res.send('ok');
  	});
  },
  render: function (req, res) {
  	var request = require('request');
  	var http = require('http');
	var fs = require('fs');
	var filecontent = "file assets/vidsq/intro.mp4\n";
	fs.readdir("assets/video/", function(err, files){
		for(var i = 0; i < files.length; i++){
			if(/.*\.mp4/.test(files[i])){
				filecontent += "file assets/video/" + files[i]+ "\n";
				filecontent += "file assets/vidsq/transition.mp4\n";

	

			}
		}
		fs.writeFile("concat.txt", filecontent, function(err) {
			var exec = require('child_process').exec;
			fs.readdir("assets/rendered/", function(err, files){
				var cmd = "./ffmpeg -f concat -i concat.txt -c copy assets/rendered/"+files.length+".mp4";
				exec(cmd, function(error, stdout, stderr) {
				  console.log(error, stdout, stderr);
				});
			});
		});
	});
    return res.send('ok');
  }
};

