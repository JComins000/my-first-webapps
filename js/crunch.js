var evolve_rate = 12

$(function() {
	$('input').on('input', function (e) {
		var catches = 0;
		var evolutions = 0;
		var melts = 0;
		var candies = ($('#candies').val().length != 0) ? parseInt($('#candies').val(), 10) : 0;
		var pokemon = ($('#pokemon').val().length != 0) ? parseInt($('#pokemon').val(), 10) : 0;

		function catch_pokemon() {
			console.log("cat", candies, pokemon);
			catches++;
			pokemon++;
			candies+=3;
		}
		function melt() {
			console.log("mel", candies, pokemon);
			melts++;
			pokemon--;
			candies++;
		}
		function evolve() {
			console.log("evo", candies, pokemon);
			evolutions++;
			candies -= evolve_rate - 1;
			pokemon--;
		}

		// evolve anything we can
		while (pokemon > 0) {
			if (candies < evolve_rate) {
				melt();
			} else {
				evolve();
			}
		}

		$('#melts').html(melts);
		$('#evolutions').html(evolutions);

		console.log("pokemon, candies", pokemon, candies);
		// // first spend the candies, catch pokemon if needed
		// while (candies >= evolve_rate) {
		// 	evolve();
		// }
		// // transfer all pokemon and evolve if possible
		// while (pokemon > 0) {
		// 	melt();
		// }
		// console.log("determining remainder", candies, pokemon, perfect);
		// // find out how many more pokemon we need for the next checkpoint
		// var curr_catches = catches;
		// if (!perfect) {
		// 	while (candies < evolve_rate) {
		// 		console.log(candies, evolve_rate);
		// 		catch_pokemon();
		// 		if (pokemon > 1) {
		// 			melt();
		// 		}
		// 	}
		// }

		// var html = '';

		// if (!perfect || curr_catches == 1) {
		// 	html += "<p>Catch <b>"
		// 	+ catches
		// 	+ "</b> pokémon for your next evolution!</p>";
		// } else {
		// 	html += "<p>Your next <b>"
		// 	+ curr_catches
		// 	+" catch"
		// 	+ (curr_catches == 1 ? "" : "es")
		// 	+ "</b> "
		// 	+ " will yield evolutions!</p>";
		// }
		// return html;
	});
	$('input').trigger('input');
});