function empty(obj) {
	const objType = typeof(obj);

	if (objType === 'undefined' || obj === null) {
		return true;
	}

	if (objType === 'object') {
		// JSON
		if (isNaN(parseInt(obj.length, 10))) {
			return (JSON.stringify(obj) === JSON.stringify({}));
		}
		// List
		else {
			return (obj.length === 0);
		}
	}

	if (objType === 'string') {
		return ($.trim(obj) === '');
	}

	return false;
}

function initPlan() {
	$.getJSON('data/plan.json', function(data) {
		const planObject = $('#plan');
		const template = planObject.find('.item.template');
		const container = template.parent();

		template.removeClass('template');

		data.forEach(function (item, index) {
			let itemObject = template.clone();
			let title = index == 2 ? 'Next plan' : (index == 1 ? 'Current plan' : 'Last plan');

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
		autoplaySpeed: 3500,
		arrows: false
	});
}

function calcBannerTop() {
	const navHeight = $('header .navigation').outerHeight();
	
	$('header .banner').css('padding-top', navHeight);
}

function initMembers() {
	$.getJSON('data/mem.json', function(data) {
		const memObject = $('#members');
		const template = memObject.find('.mem-list .item.template');
		const container = template.parent();

		template.removeClass('template');

		data.forEach(function (item, index) {
			let itemObject = template.clone();
			let avatar = empty(item.avatar) ? 'no-avatar.jpg' : item.avatar;
			let quote = empty(item.quote) ? 'I\'m too lazy to upload an avatar & write something good' : item.quote;

			itemObject.find('img').attr('src', 'img/mem/' + avatar);
			itemObject.find('.name').html(item.name);
			itemObject.find('.quote').html(quote);

			container.append(itemObject);
		});

		template.remove();

		memObject.removeClass('hide');

		initMemberSlider();
	});
}

$(document).ready(function() {
	$(window).resize(function(e) {
		calcBannerTop();
	});

	initScrollAnimation();

	initMembers();
	initPlan();

	calcBannerTop();
});