// JavaScript Document
(function(){
	var player,
		query,
		key = "4c0e1e8556a0fba25dabb3745b124dc7a8abe2ef",
		game = $('.game'),
		load = $('#load'),
		clicks = 0,
		playToken,
		buy = $('#buy'),
		hidden = $('.hidden'),
		output = $('#output'),
		guesses = $('.guess');
		
	// initializing  the player 
	var player = $("#player").jPlayer({
	  ready: function () {
		$(this).jPlayer("setMedia", {
			m4a: null		
		});
	  },
	  swfPath: "",
	  supplied: "m4a",
	  cssSelectorAncestor: "",
	  cssSelector: {
		play: "#play",
		pause: "#pause",
		stop: "#stop",
		mute: "a#mute",
		unmute: "a#unmute",
		currentTime: "#currentTime",
		duration: "#duration"
	  },
	  size: {
		width: "auto",
		height: "auto"
	  }
	});
	
	
	$('.button').on('click',function(){
		var $this = $(this),
			query = $this.data('query'),
			randomMix;

		clicks++;
		
		game.hide();
		player.jPlayer("stop");
		// hide all other buttons
		$this.siblings('a.button').fadeToggle(200);
		
		if(clicks%2 != 0){
			game.hide();			
			load.show();
			output.hide();
			guesses.show();
			
			$.when(getMixes(key,query), getPlayToken(key), getMixes(key,'bla'), getMixes(key,'study'))
				.done(function(mixes,tokenResponse,mixes2,mixes3){

					// i don't need the other information i get on the ajax results
					mixes = mixes[0];
					tokenResponse = tokenResponse[0];					
					mixes2 = mixes2[0];
					mixes3 = mixes3[0];
					// get a random mix
					randomMix = Math.floor(Math.random() * mixes.mixes.length);					
					mix = mixes.mixes[randomMix];
					mix2 = mixes2.mixes[randomMix];
					mix3 = mixes3.mixes[randomMix];
					// get the play token
					token = tokenResponse.user.id;					


					$.when(getMix(key,mix.id,token),getMix(key,mix2.id, token), getMix(key,mix3.id,token))
					.then(
					function(mix,mix2,mix3){// if we got the mix						
						mix = mix[0];
						mix2 = mix2[0];
						mix3 = mix3[0];
						// assigning values to the guesses
						correctPosition = Math.floor(Math.random() * 3) + 1 ;

						switch(correctPosition){
							case 1 :
								$('#guess1').text(mix.set.track.name);
								$('#guess2').text(mix2.set.track.name);
								$('#guess3').text(mix3.set.track.name);
								break;
							case 2 :
								$('#guess1').text(mix2.set.track.name);
								$('#guess2').text(mix.set.track.name);
								$('#guess3').text(mix3.set.track.name);
								break;
							case 3 :
								$('#guess1').text(mix3.set.track.name);
								$('#guess2').text(mix2.set.track.name);
								$('#guess3').text(mix.set.track.name);
								break;
						}
						
						load.hide();
						game.fadeIn(200);
						
						player.jPlayer("setMedia",{
							m4a : mix.set.track.url						
						});
						//store the current song
						hidden.text(mix.set.track.name);

						// link to itunes
						buy.attr('href',mix.set.track.buy_link)
							.css({
								'background-image': 'url('+mix.set.track.buy_icon+')',
								'width' : '102px',
								'height' : '17px',
								display : 'block',
								'color' : 'transparent',
								'background-repeat' : 'no-repeat'
							});
	
					},
					function(response){ // something went wrong
						alert('Something wen\'t wrong :( Try again ?');
						console.warn(response);
					}
					);					
				});
		}					

	});

	$('#next').on('click',function(e){		
		player.jPlayer("stop");
		load.show();
		game.hide();
		output.hide();
		guesses.show();
		$.when(getMixes(key,query), getPlayToken(key), getMixes(key,'bla'), getMixes(key,'study'))
				.done(function(mixes,tokenResponse,mixes2,mixes3){				

				// i don't need the other information i get on the ajax results
				mixes = mixes[0];
				tokenResponse = tokenResponse[0];
				mixes2 = mixes2[0];
				mixes3 = mixes3[0];
				// get a random mix
				randomMix = Math.floor(Math.random() * mixes.mixes.length);
				mix = mixes.mixes[randomMix];
				mix2 = mixes2.mixes[randomMix];
				mix3 = mixes3.mixes[randomMix];
				// get the play token
				token = tokenResponse.user.id;

				// get a random mix
				randomMix = Math.floor(Math.random() * mixes.mixes.length);					
				mix = mixes.mixes[randomMix];
				mix2 = mixes2.mixes[randomMix];
				mix3 = mixes3.mixes[randomMix];

				// get the play token
				token = tokenResponse.user.id;

				$.when(getMix(key,mix.id,token),getMix(key,mix2.id, token), getMix(key,mix3.id,token))
					.then(
					function(mix,mix2,mix3){// if we got the mix						

					mix = mix[0];
					mix2 = mix2[0];
					mix3 = mix3[0];	

					load.hide();
					game.show();

					// assigning values to the guesses
					correctPosition = Math.floor(Math.random() * 3) + 1 ;
					switch(correctPosition){
						case 1 :
							$('#guess1').text(mix.set.track.name);
							$('#guess2').text(mix2.set.track.name);
							$('#guess3').text(mix3.set.track.name);
							break;
						case 2 :
							$('#guess1').text(mix2.set.track.name);
							$('#guess2').text(mix.set.track.name);
							$('#guess3').text(mix3.set.track.name);
							break;
						case 3 :
							$('#guess1').text(mix3.set.track.name);
							$('#guess2').text(mix2.set.track.name);
							$('#guess3').text(mix.set.track.name);
							break;
					}
					
					load.hide();
					game.fadeIn(200);
					
					player.jPlayer("setMedia",{
						m4a : mix.set.track.url						
					});
					//store the current song
					hidden.text(mix.set.track.name);

					// link to itunes
					buy.attr('href',mix.set.track.buy_link)
						.css({
							'background-image': 'url('+mix.set.track.buy_icon+')',
							'width' : '102px',
							'height' : '17px',
							display : 'block',
							'color' : 'transparent',
							'background-repeat' : 'no-repeat'
						});

				},
				function(response){ // something went wrong
					alert('Something wen\'t wrong :( Try again ?');
					console.warn(response);
				}
				);					
			});

		e.preventDefault();
		return false;
	});

	$('.guess').on('click',function(){
		$this = $(this);
		if( $this.text() == hidden.text() ){			
			$this.siblings('a').fadeOut(200);
			output.show().text('Thats Correct !');
		} else {
			output.show().text('Try Again');
			$this.fadeOut(200);
		}


		
		return false;
	});
	
	/************************************************************************
	* Functions
	*************************************************************************/

	 /**
	 * Returns the mixes that match certain criteria
	 */
	function getMixes(key,query){
		return $.ajax({
			url : 'http://8tracks.com/mixes.jsonp',
			data : { api_key : key , q : query, sort : 'popular' },
			dataType : 'jsonp',		
		});
	}
	/**
	* Gets the information from an especific mix by it's ID
	*/
	function getMix(key,mixId,token){
		return $.ajax({
			url : 'http://8tracks.com/sets/'+token+'/play.jsonp',
			data : { api_key : key, mix_id : mixId },
			dataType : 'jsonp',		
		});
	}
	/**
	* Gets the play token so the user can continue listening to a mix
	*/
	function getPlayToken(key){
		return $.ajax({
			url : 'http://8tracks.com/new.jsonp',
			data : { api_key : key },
			dataType : 'jsonp',		
		});
	}

})();