$(function() {
	var evolve_rate = 12;
	$('input').on('input', function (e) {
		$('#more').text(function () {
			var evolutions = 0;
			var caught_pokemon = 0;
			var candies = ($('#candies').val().length != 0) ? parseInt($('#candies').val(), 10) : 0;
			var pokemon = ($('#pokemon').val().length != 0) ? parseInt($('#pokemon').val(), 10) : 0;
			var pokemon_remaining = pokemon;
			function catch_pokemon() {
				caught_pokemon++;
				pokemon_remaining++;
				candies+=4;
			}
			function evolve() {
				evolutions++;
				if (evolutions > pokemon + caught_pokemon) {
					catch_pokemon();
				}
				pokemon_remaining--;
				candies -= evolve_rate;
				candies++; // evolve
				candies++; // melt
			}
			do {
				console.log("do" ,candies, pokemon_remaining);
				while (candies >= evolve_rate) {
					evolve();
					if (pokemon_remaining < 0) {
						catch_pokemon();
					}
				}
				if (pokemon_remaining > 0) {
					pokemon_remaining--;
					candies++;
				}
			} while (pokemon_remaining > 0);
			console.log("while" ,candies, pokemon_remaining);
			if (candies > 2) {
				while (candies < evolve_rate + 1) {
					catch_pokemon();
				}
				evolutions++;
			}
			$('#evolutions').html("for <span class='b'>"+evolutions+"</span> evolve");
			if (evolutions != 1) {
				$('#evolutions').append("s");
			}
			$('#evolutions').append("!");	
			return Math.max(caught_pokemon, 0);
		});
	});
	$('button').click( function() {  
	    $(this).addClass('active');
	    $('button').not(this).removeClass('active');
	    evolve_rate = $(this).text();
	    $('input').trigger('input');
	}).focus( function() {
		$(this).click();
	});
});
