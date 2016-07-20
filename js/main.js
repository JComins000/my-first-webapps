$(function() {
	$('#toggle_melt').mousedown( function () {
        do_melt = !do_melt;
        $('input').trigger('input');
        $(this).children().first().children().toggleClass('dark-tone')
    });
    $('.switch').click( function() {  
	    $(this).addClass('active');
	    $('.switch').not(this).removeClass('active');
	    evolve_rate = parseInt($(this).text());
	    $('input').trigger('input');
	}).focus( function() {
		$(this).click();
	});
	$('#catch').click( function() {
		$('#candies').val( function() {
			var candies = ($('#candies').val().length != 0) ? parseInt($('#candies').val(), 10) : 0;
			return candies + 3;
		});
		$('#pokemon').val( function() {
			var pokemon = ($('#pokemon').val().length != 0) ? parseInt($('#pokemon').val(), 10) : 0;
			return ++pokemon;
		});
		$('input').trigger('input');
	});
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
    $('input').trigger('input');
});
