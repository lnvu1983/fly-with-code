$(document).ready(function() {
	$.getJSON('data/plan.json', function(data) {
		const planObject = $('.plans');
		const template = planObject.find('.details .item.template');
		const container = template.parent();

		template.removeClass("template");

		data.forEach(function (item, index) {
			const itemObject = template.clone();

			itemObject.find('.date').html(item.date);
			itemObject.find('.time').html(item.time);
			itemObject.find('.place').html(item.place);
			itemObject.find('.content').html(item.content);

			container.append(itemObject);
		});

		template.remove();

		planObject.removeClass('hide');
	});
});