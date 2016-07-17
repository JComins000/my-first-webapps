$(function() {
	var evolve_rate = 12;
	var do_melt = true;
	$('#toggle_melt').mouseup( function () {
        $(this).html( function(i, old) {
        	do_melt = !do_melt;
            return old === 'Melt evolutions' ? "Don't melt evolutions" : 'Melt evolutions';
        });
    });
    // $(document).keydown(function (e) {
    //     if (e.which == toggle_dir_key && !$('#toggle_melt').is(":focus")) {
    //         $('#toggle_melt').click();
    //     }
    // });
	$('input').on('input', function (e) {
		$('#output').html(function () {
			var evolutions = 0;
			var caught_pokemon = 0;
			var candies = ($('#candies').val().length != 0) ? parseInt($('#candies').val(), 10) : 0;
			var pokemon = ($('#pokemon').val().length != 0) ? parseInt($('#pokemon').val(), 10) : 0;
			var pokemon_remaining = pokemon;
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

				if (do_melt) {
					melt();
				} else {
					pokemon_remaining--;
				}

				if (evolutions > pokemon + caught_pokemon || pokemon_remaining < 0) {
					catch_pokemon();
				}

				candies -= evolve_rate;
				candies++; // from evolve
			}

			do {
				console.log("spending candies", candies, pokemon_remaining);
				while (candies >= evolve_rate) {
					evolve();
				}
				if (pokemon_remaining > 0) {
					melt();
				}
			} while (pokemon_remaining > 0);
			console.log("determining remainder", candies, pokemon_remaining);
			if (candies > 2) {
				while (candies < evolve_rate + 1) {
					console.log(candies, evolve_rate);
					catch_pokemon();
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
