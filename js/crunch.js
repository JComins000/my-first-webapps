$(function() {
	$('input').on('input', function (e) {
		var cp_inv = get_inventory();
		var candies = cp_inv[0];
		var pidgey = cp_inv[1];
		var catches = 0;
		var pidgeotto = 0;
		var melts = 0;

		function catch_pokemon() {
			catches++;
			pidgey++;
			candies+=3;
		}
		function melt() {
			melts++;
			pidgey--;
			candies++;
		}
		function evolve() {
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

		// prepare for the next evolve cycle
		// transfer all pidgeotto
		candies += pidgeotto; 
		// continue evolving, transfer pidgeotto as we go
		while (pidgey > 0) {
			if (candies < evolve_rate) {
				melt();
			} else {
				evolve();
				candies++;
			}
		}

		var html;
		if (candies < 13) {
			html = "Catch <b>"
				+ Math.ceil((evolve_rate+1-candies)/4)
				+ "</b> pidgey for another evolve.";
		} else {
			html = "Continue catching <b>"
				+ (candies/(evolve_rate-5) << 0)
				+ "</b> pidgey for evolutions."
		}
		$('#output').html(html);
	});
	$('input').trigger('input');
});