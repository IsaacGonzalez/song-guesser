(function(){
	var key = "4c0e1e8556a0fba25dabb3745b124dc7a8abe2ef",
		mixes = $('#mixes'),
		token,
		mixes,
		mixId = 934815 ,
		playerSource = $('#playerSource');
		
	
	getToken(key).done(function(data){
		token = data.play_token;
		$('#token').text(token);
		$('#mix').text(mixId);
	});		
	
	var query = "relax";
	
	getMixes(key,query).done(function(data){
		//console.log(data);
		$.each(data.mixes,function(){
			$('#mixes').append( $('<li></li>',{ class : 'mix', text : this.id +' '+ this.name }) );
		});
		
		random_index = Math.floor(Math.random()* data.mixes.length)
		
		random_mix = data.mixes[random_index];
		
		getMix(key,random_mix.id).done(function(mix){
			console.log(mix);
			$('#song').text(mix.set.track.name+' - '+mix.set.track.performer);
			
			var url = mix.set.track.url;
			
			$("#jquery_jplayer_1").jPlayer({
				ready: function () {
				  $(this).jPlayer("setMedia", {
					m4a: url
				  });
				},
				supplied: "m4a"
			  });
		});
		
		
		
	});

	
	function getToken(key){
		return $.ajax({
			url : 'http://8tracks.com/sets/new.jsonp',
			data : { api_key : key },
			dataType : 'jsonp'
		});
	}
	
	function getMixes(key,genre){
		return $.ajax({
			url : 'http://8tracks.com/mixes.jsonp',
			data : { api_key : key , q : genre },
			dataType : 'jsonp',		
		});
	}
	
	function getMix(key,mixId){
		return $.ajax({
			url : 'http://8tracks.com/sets/460486803/play.jsonp',
			data : { api_key : key, mix_id : mixId },
			dataType : 'jsonp',		
		});
	}
	
	
	
	
})();