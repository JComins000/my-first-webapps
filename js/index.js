$(function() {
	var evolve_rate = 12;
	$('input').on('input', function (e) {
		$('#evolutions').text(function () {
			var evolutions;
			var candies = ($('#candies').val().length != 0) ? parseInt($('#candies').val(), 10) : 0;
			var pokemon = ($('#pokemon').val().length != 0) ? parseInt($('#pokemon').val(), 10) : 0;
			candies += pokemon;
			for (evolutions = 0; candies >= evolve_rate; candies -= (evolve_rate - 1)) {
				evolutions++;
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
