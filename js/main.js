$(function() {
	var evolve_rate = 12;
	var do_melt = true;
	$('#toggle_melt').mouseup( function () {
        $(this).html( function(i, old) {
        	do_melt = !do_melt;
            return old === 'Transfer evolutions' ? "Don't transfer evolutions" : 'Transfer evolutions';
        });
        $('input').trigger('input');
    });
    $('.switch').click( function() {  
	    $(this).addClass('active');
	    $('.switch').not(this).removeClass('active');
	    evolve_rate = parseInt($(this).text());
	    $('input').trigger('input');
	}).focus( function() {
		$(this).click();
	});
	$('#catch').click( function() {
		$('#candies').val( function() {
			var candies = ($('#candies').val().length != 0) ? parseInt($('#candies').val(), 10) : 0;
			return candies + 3;
		});
		$('#pokemon').val( function() {
			var pokemon = ($('#pokemon').val().length != 0) ? parseInt($('#pokemon').val(), 10) : 0;
			return ++pokemon;
		});
		$('input').trigger('input');
	});
	$('#melt').click( function() {
		var candies = ($('#candies').val().length != 0) ? parseInt($('#candies').val(), 10) : 0;
		var pokemon = ($('#pokemon').val().length != 0) ? parseInt($('#pokemon').val(), 10) : 0;
		if (pokemon > 0) {
			$('#candies').val( function() {
				return ++candies;
			});
			$('#pokemon').val( function() {
				return --pokemon ? pokemon : '';
			});
		}
		$('input').trigger('input');
	});
	$('input').on('input', function (e) {
		$('#output').html(function () {
			var caught_pokemon = 0;
			var curr_evolutions = 0;
			var curr_candies = ($('#candies').val().length != 0) ? parseInt($('#candies').val(), 10) : 0;
			var curr_pokemon = ($('#pokemon').val().length != 0) ? parseInt($('#pokemon').val(), 10) : 0;
			var perfect = (candies == 0 && pokemon_remaining == 0);
			function catch_pokemon() {
				console.log("cat", candies, pokemon_remaining);
				caught_pokemon++;
				pokemon_remaining++;
				candies+=3;
			}
			function melt() {
				console.log("mel", candies, pokemon_remaining);
				pokemon_remaining--;
				candies++;
			}
			function evolve() {
				console.log("evo", candies, pokemon_remaining);
				evolutions++;
				perfect = false;
				candies -= evolve_rate;
				if (candies == 0) {
					perfect = true;
				}
				if (do_melt) {
					melt();
				} else {
					pokemon_remaining--;
				}
				candies++;
				if (evolutions > pokemon + caught_pokemon || pokemon_remaining < 0) {
					catch_pokemon();
				}
				if (pokemon_remaining != 0) {
					perfect = false;
				}
			}

			// evolve anything we can
			while (curr_pokemon > 0 && curr_candies >= evolve_rate) {
				curr_evolutions++;
				curr_candies -= evolve_rate;
				candies++;
				if (do_melt) {
					candies++;
				}
				curr_pokemon--
			}
			var evolutions = curr_evolutions;
			var candies = curr_candies;
			var pokemon_remaining = curr_pokemon;

			console.log("spending candies", candies, pokemon_remaining);
			// first spend the candies, catch pokemon if needed
			while (candies >= evolve_rate) {
				evolve();
			}
			// transfer all pokemon and evolve if possible
			while (pokemon_remaining > 0) {
				melt();
				if (candies >= evolve_rate) {
					evolve();
				}
			}
			console.log("determining remainder", candies, pokemon_remaining, perfect);
			// find out how many more pokemon we need for the next checkpoint
			if (!perfect) {
				while (candies < evolve_rate) {
					console.log(candies, evolve_rate);
					catch_pokemon();
					if (pokemon_remaining > 1) {
						melt();
					}
				}
				evolutions++;
			}

			var html = "<p style='font-size:25px;'>You can evolve <b>"
			+ curr_evolutions
			+ "</b> pokemon! <p>You will have <b>"
			+ curr_candies
			+ "</b> candies and <b>"
			+ curr_pokemon
			+ "</b>	pokemon after.</p><p>Catch&nbsp;<b>"
			+ Math.max(caught_pokemon, 0)
			+ "</b>&nbsp;more to evolve <b>"
			+ evolutions
			+ "</b> pokemon!</p>";
			return html;
		});
	});
	$('.switch').click( function() {  
	    $(this).addClass('active');
	    $('.switch').not(this).removeClass('active');
	    evolve_rate = parseInt($(this).text());
	    $('input').trigger('input');
	}).focus( function() {
		$(this).click();
	});
    $('input').trigger('input');
});
