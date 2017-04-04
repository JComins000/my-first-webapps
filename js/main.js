function catch_pkmn(candy, transfer = false) {
	$('#candies').val( function() {
		var candies = ($('#candies').val().length != 0) ? parseInt($('#candies').val(), 10) : 0;
		return candies + candy;
	});
	if (!transfer) {
		$('#pokemon').val( function() {
			var pokemon = ($('#pokemon').val().length != 0) ? parseInt($('#pokemon').val(), 10) : 0;
			return ++pokemon;
		});
	}
	$('input').trigger('input');
}

$(function() {
	$('#pidgey').click( function(){catch_pkmn(3);} );
	$('#pidgey-pinap').click( function(){catch_pkmn(6);} );
	$('#pidgeotto').click( function(){catch_pkmn(6, true);} );
	$('#pidgeotto-pinap').click( function(){catch_pkmn(11, true);} );
	$('#pidgeot').click( function(){catch_pkmn(11, true);} );
	$('#pidgeot-pinap').click( function(){catch_pkmn(21, true);} );
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
	$('#reset').click( function() {
		$('#candies').val('');
		$('#pokemon').val('');
		$('input').trigger('input');
	});
});
