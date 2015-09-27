/**
 * ChapterController
 *
 * @description :: Server-side logic for managing chapters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


	getChapters: function (req, res) {
		console.log("controller");
		var chapters = [];
		
		var fs = require('fs');
		var tmp = [
					{ name: "Laut",
                      description: "ich möchte lachen",
                      starttime: 30,
                      duration: 30,
                      imageURL: "https://www.luxuspur2014.de/documents/image/28/2807/jb-yy-28-0001-1600.jpg"
                    },
                    { name: "Nachrichten",
                      description: "mehr Informationen",
                      starttime: 60,
                      duration: 30,
                      imageURL: "https://www.luxuspur2014.de/documents/image/28/2807/jb-yy-28-0001-1600.jpg"
                    }
                    ];
			
		Video.find().exec(function(err,videos) {
			var timecode = 7; // intro
			for (var u=0;u<videos.length;u++) {
				var vid = {
					name:videos[u].title,
					url:"http://192.168.178.55:1337/videofiles/"+videos[u].id,
					imageURL: "http://192.168.178.55:1337/images/teaser/"+videos[u].id+".mp4.png",
					description:"",
					id:videos[u].id,
					starttime:timecode,
					duration:videos[u].length/1000
				}
				timecode+=(videos[u].length/1000)-1;
				chapters.push(vid);
			}
			console.log(chapters);
			var stringcontent = "var chapters = [";
			for (var o = 0; o<chapters.length;o++) {
				stringcontent += "{name:'"+chapters[o].name+"',description:'"+chapters[o].description+"',starttime:"+chapters[o].starttime+",duration:"+chapters[o].duration+",imageURL:'"+chapters[o].imageURL+"'},";
			}
			stringcontent += "]";
		//console.log(stringcontent);
		//var text = fs.readFileSync('assets/js/product2.xml.js','utf8');
		//text.replace("###dynamic###",stringcontent);
		//res.send(text);
			res.view("chapters.ejs",{ layout: "clean.ejs",chapters:chapters,stringcontent:stringcontent});
		});
		
	}

};