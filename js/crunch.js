$(function() {
	$('input').on('input', function (e) {
		var cp_inv = get_inventory();
		var candies = cp_inv[0];
		var pidgey = cp_inv[1];
		var catches = 0;
		var pidgeotto = 0;
		var melts = 0;

		function catch_pokemon() {
			console.log("cat", candies, pidgey);
			catches++;
			pidgey++;
			candies+=3;
		}
		function melt() {
			console.log("mel", candies, pidgey);
			melts++;
			pidgey--;
			candies++;
		}
		function evolve() {
			console.log("evo", candies, pidgey);
			pidgeotto++;
			candies -= evolve_rate - 1;
			pidgey--;
		}

		// evolve anything we can
		// don't transfer pideotto yet because it takes too long in game
		// stop transferring early if we wont have enough candies
		while (pidgey > 0 && pidgey + candies > evolve_rate) {
			if (candies < evolve_rate) {
				melt();
			} else {
				evolve();
			}
		}
		$('#melts').html(melts);
		$('#evolutions').html(pidgeotto);
		console.log("pidgey, candies", pidgey, candies);

		// prepare for the next evolve cycle
		// transfer all pidgeotto
		candies += pidgeotto; 
		console.log("pidgeotto candies", pidgeotto);




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
		// 	+ " will yield pidgeotto!</p>";
		// }
		// return html;
	});
	$('input').trigger('input');
});