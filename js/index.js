$(function() {
	var evolve_rate = 12;
	$('input').on('input', function (e) {
		$('#evolutions').text(function () {
			var evolutions = 0;
			var candies = ($('#candies').val().length != 0) ? parseInt($('#candies').val(), 10) : 0;
			var pokemon = ($('#pokemon').val().length != 0) ? parseInt($('#pokemon').val(), 10) : 0;
			var pokemon_remaining = pokemon;
			while (pokemon_remaining > 0) {
				console.log(pokemon_remaining)
				while (candies >= evolve_rate) {
					evolutions++;
					pokemon_remaining--;
					candies -= evolve_rate;
					candies++;
				}
				if (pokemon_remaining > 0) {
					pokemon_remaining--;
					candies++;
				}
			}
			return Math.max(evolutions-pokemon, 0);
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
	$('body').keydown(function (e) {
		if (e.which == 37) {
			$('.active').prev('button').click();
		} else if (e.which == 39) {
			$('.active').next('button').click();
		}
	});
});
