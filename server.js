var express = require('express');
var http = require('http');
var jquery = require('jquery');
var config = require('./config.js');
var app = express();
var $ = require('jquery');
var GIANTBOMB_KEY = config.MY_KEY;
/*
Config.js contents:
var config = {
	MY_KEY : 'key string here'
}
*/

app.get('/', function(req, res){
	res.send('Hello World');
});


/*TEST POST REQUEST: http://localhost:3000/GiantBomb/original_release_date:1993-11-28%2011:11:11*/
app.post('/GiantBomb/:inputdate', function(req, res){
	/*TODO: Take arguments and query GiantBomb API, then return results. Transpose JQuery AJAX to the http request module; better for Node than emulating a window for JQuery*/
	/*$.ajax({
    url: 'http://www.giantbomb.com/api/games/',
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'json_callback',
    data:{
      api_key: '5e57f67f91f9ea33558f01628a3d393ea9ebfd8a',
      filter: req.params.inputdate,
      field_list: 'name,site_detail_url',
      format: 'jsonp'
    },
    success: function(data){
      console.log('success',data);
    }
	});
	res.send(data);*/
	var bombQuery = encodeURIComponent(req.params.inputdate);
	var request = {
		'host': 'giantbomb.com',
		'accept': 'application/json',
		'api_key': '5e57f67f91f9ea33558f01628a3d393ea9ebfd8a',
		'path': bombQuery
	};
	http.get(request, function(resp){
		resp.on('data', function(chunk){
			//Do something with chunk
			console.log(chunk);
			var jsonObject = JSON.parse(chunk);
			console.log(jsonObject);
		});
	}).on("error", function(e){
		console.log("Got error: " + e.message);
	});

});

app.listen(3000, function(){
	console.log('App is listening on Port 3000')
});




//TODO: Set up Express routes and whatnot, take a URL query from GiantBomb_JS and forward it to GiantBomb API; forward GiantBomb API's response to GiantBomb_JS
/*
Upon clicking 'Go':
Send request to Express app, including date params. We're gonna keep the while loop client-side for now (30 requests to Express & therefore GiantBomb) (Answer by Anton on this page) https://stackoverflow.com/questions/30232258/how-do-i-pass-a-parameter-to-express-js-router
Make the GiantBomb call in Express router
res.json the results back to the client-side method, construct the div as usual

Two options now:
res.send the json from GiantBomb, then parse in client https://stackoverflow.com/questions/45128956/sending-json-response-from-nodejs-express
Render the whole page and send it??


*/




/*
function GetGames(inputdate,yyyy){
  var div = $("<div class='gamesOutput'></div>")
  var $gamesList = $('#gamesList');

//TODO: Copy this method in GiantBomb_REST, make an equivalent handler and call that instead
  $.ajax({
    url: 'http://www.giantbomb.com/api/games/',
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'json_callback',
    data:{
      api_key: GIANTBOMB_KEY,
      filter: inputdate,
      field_list: 'name,site_detail_url',
      format: 'jsonp'
    },
    success: function(data){
      if(data.number_of_total_results != 0){
        div.append("<br><h5>" + yyyy + "</h5><br>");
        $.each(data.results, function(i, gamereturn){
          if(gamereturn.name != null){
            div.append("<a href=\"" + gamereturn.site_detail_url + "\">" + gamereturn.name + "</a><br>");
          }
        })
      }
      console.log('success',data);
    }
  });
  $gamesList.append(div);
}
*/
