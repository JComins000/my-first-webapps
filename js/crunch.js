$(function() {
	$('input').on('input', function (e) {
		$('#output').html(function () {
			var catches = 0;
			var evolutions = 0;
			var curr_transfers = 0;
			var candies = ($('#candies').val().length != 0) ? parseInt($('#candies').val(), 10) : 0;
			var pokemon = ($('#pokemon').val().length != 0) ? parseInt($('#pokemon').val(), 10) : 0;
			var perfect = (candies == 0 && pokemon == 0);
			function catch_pokemon() {
				console.log("cat", candies, pokemon);
				catches++;
				pokemon++;
				candies+=3;
			}
			function melt() {
				console.log("mel", candies, pokemon);
				pokemon--;
				candies++;
			}
			function evolve(do_catch = true) {
				console.log("evo", candies, pokemon);
				evolutions++;
				perfect = false;
				candies -= evolve_rate;
				if (candies == 0) {
					perfect = true;
				}
				pokemon--;
				if (do_melt) {
					candies++;
				}
				candies++;
				if (do_catch) {
					if (evolutions > pokemon + catches || pokemon < 0) {
						catch_pokemon();
					}
				}
				if (pokemon != 0) {
					perfect = false;
				}
			}
			// evolve anything we can
			while (pokemon > 0 && candies >= evolve_rate) {
				evolve(false);
			}
			while (pokemon > 0) {
				melt();
				curr_transfers++;
				if (pokemon > 0 && candies >= evolve_rate) {
					evolve(false);
				}
			}

			var curr_candies = candies;
			var curr_pokemon = pokemon;

			console.log("spending candies", candies, pokemon);
			// first spend the candies, catch pokemon if needed
			while (candies >= evolve_rate) {
				evolve();
			}
			// transfer all pokemon and evolve if possible
			while (pokemon > 0) {
				melt();
			}
			console.log("determining remainder", candies, pokemon, perfect);
			// find out how many more pokemon we need for the next checkpoint
			var curr_catches = catches;
			if (!perfect) {
				while (candies < evolve_rate) {
					console.log(candies, evolve_rate);
					catch_pokemon();
					if (pokemon > 1) {
						melt();
					}
				}
			}

			var html = "<p>You can transfer <b>"
			+ curr_transfers
			+ "</b>, and evolve <b>"
			+ evolutions
			+ "</b> pokémon! <p>You will have <b>"
			+ curr_candies
			+ "</b> "
			+ (curr_candies == 1 ? "candy" : "candies")
			+ " and <b>"
			+ curr_pokemon
			+ "</b>	pokémon.</p>"

			if (!perfect || curr_catches == 1) {
				html += "<p>Catch <b>"
				+ catches
				+ "</b> pokémon for your next evolution!</p>";
			} else {
				html += "<p>Your next <b>"
				+ curr_catches
				+" catch"
				+ (curr_catches == 1 ? "" : "es")
				+ "</b> "
				+ " will yield evolutions!</p>";
			}
			return html;
		});
	});
	$('input').trigger('input');
});