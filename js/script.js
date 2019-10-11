function initPlan() {
	$.getJSON('data/plan.json', function(data) {
		const planObject = $('.plans');
		const template = planObject.find('.item.template');
		const container = template.parent();

		template.removeClass("template");

		data.forEach(function (item, index) {
			const itemObject = template.clone();
			const title = index == 2 ? 'Next plan' : (index == 1 ? 'Current plan' : 'Last plan');

			itemObject.find('.title').html(title);
			itemObject.find('.date').html(item.date);
			itemObject.find('.time').html(item.time);
			itemObject.find('.place').html(item.place);
			itemObject.find('.content').html(item.content);

			container.append(itemObject);
		});

		template.remove();

		planObject.removeClass('hide');
	});
}

function initScrollAnimation() {
	$('.menu-item').click(function(e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $('#' + $(this).attr('href')).offset().top - 60
		}, 800);
	});
}

function initMemberSlider() {
	$('#members .mem-list').slick({
		autoplay: true,
		auplaySpeed: 500,
		arrows: false
	});
}

function calcBannerTop() {
	const navHeight = $('header .navigation').outerHeight();
	
	$('header .banner').css('padding-top', navHeight);
}

$(document).ready(function() {
	$(window).resize(function(e) {
		calcBannerTop();
	});

	initScrollAnimation();

	initMemberSlider();
	initPlan();

	calcBannerTop();
});