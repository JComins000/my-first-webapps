var evolve_rate = 12;

function get_inventory() {
	var candies = ($('#candies').val().length != 0) ? parseInt($('#candies').val(), 10) : 0;
	var pokemon = ($('#pokemon').val().length != 0) ? parseInt($('#pokemon').val(), 10) : 0;
	return [candies, pokemon];
}
function catch_pkmn(candy, melt = false) {
	var cp_inv = get_inventory();
	$('#candies').val( function() {return cp_inv[0] + candy;});
	if (!melt) {
		$('#pokemon').val( function() {return ++cp_inv[1];});
	}
	$('input').trigger('input');
}
function melt_pkmn(modifier = 1) {
	var cp_inv = get_inventory();
	if (pokemon < modifier) {
		modifier = pokemon;
	}
	$('#candies').val( function() {return cp_inv[0] + modifier;});
	$('#pokemon').val( function() {v = cp_inv[1] - modifier; return v ? v : '';});
	$('input').trigger('input');
}
function evolve_pkmn(modifier = 1) {
	var cp_inv = get_inventory();
	modifier = Math.min(cp_inv[0]/(evolve_rate-1)+1, modifier, cp_inv[1]);
	if (modifier > 0) {
		$('#candies').val( function() {v = cp_inv[0] - modifier*(evolve_rate-1);return v ? v : '';});
		$('#pokemon').val( function() {v = cp_inv[1] - modifier;return v ? v : '';});
		$('input').trigger('input');
	}
}

$(function() {
	$('#pidgey').click( function(){catch_pkmn(3);} );
	$('#pidgey-pinap').click( function(){catch_pkmn(6);} );
	$('#pidgeotto').click( function(){catch_pkmn(6, true);} );
	$('#pidgeotto-pinap').click( function(){catch_pkmn(11, true);} );
	$('#pidgeot').click( function(){catch_pkmn(11, true);} );
	$('#pidgeot-pinap').click( function(){catch_pkmn(21, true);} );
	$('#melt').click( function() {melt_pkmn();});
	$('#melt-many').click( function() {melt_pkmn(parseInt($('#melts').html()));});
	$('#evolve-many').click( function() {evolve_pkmn(parseInt($('#evolutions').html()));});
	$('#reset').click( function() {
		$('#candies').val('');
		$('#pokemon').val('');
		$('input').trigger('input');
	});
});
