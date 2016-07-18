$(function() {
	var evolve_rate = 12;
	var do_melt = true;
	$('#toggle_melt').mouseup( function () {
        $(this).html( function(i, old) {
        	do_melt = !do_melt;
            return old === 'Transfer evolutions' ? "Don't transfer evolutions" : 'Transfer evolutions';
        });
    });
	$('input').on('input', function (e) {
		$('#output').html(function () {
			var evolutions = 0;
			var caught_pokemon = 0;
			var candies = ($('#candies').val().length != 0) ? parseInt($('#candies').val(), 10) : 0;
			var pokemon_remaining = ($('#pokemon').val().length != 0) ? parseInt($('#pokemon').val(), 10) : 0;
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
				if (pokemon_remaining != 0) {
					perfect = false;
				}
				if (evolutions > pokemon + caught_pokemon || pokemon_remaining < 0) {
					catch_pokemon();
				}
			}

			do {
				console.log("spending candies", candies, pokemon_remaining);
				while (candies >= evolve_rate) {
					evolve();
				}
				if (pokemon_remaining > 0) {
					melt();
					if (candies >= evolve_rate) {
						evolve();
					}
				}
			} while (pokemon_remaining > 0);
			console.log("determining remainder", candies, pokemon_remaining, perfect);
			if (!(candies == 1 + (do_melt ? 1 : 0) && pokemon_remaining == 0) || !perfect) {
				while (candies < evolve_rate) {
					console.log(candies, evolve_rate);
					catch_pokemon();
					if (pokemon_remaining > 1) {
						melt();
					}
				}
				evolutions++;
			}

			var html = "<p>Catch&nbsp;<b>"
			+ Math.max(caught_pokemon, 0)
			+ "</b>&nbsp;more</p><p>for <b>"
			+ evolutions
			+ "</b> evolve" 
			+ ((evolutions != 1) ? "s" : "")
			+ "!</p>";
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
