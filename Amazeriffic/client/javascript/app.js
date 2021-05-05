var main = function (toDoObjects) {
	"use strict";
	var toDos = toDoObjects.map(function (toDo) {
		return toDo.description;
	})
	$(".tabs a span").toArray().forEach(function (element) {
		$(element).on("click", function () {
			var $element = $(element),
			$content;
			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();

			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");

				for (var i = toDos.length-1; i > -1; i--) {
					$content.append($("<li>").text(toDos[i]));
				}

				$("main .content").append($content);
			}

			else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>");
				toDos.forEach(function (todo) {
					$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);
			} 

			else if ($element.parent().is(":nth-child(3)")) {
				console.log("Щелчок на вкладке Теги");
			} 

			else if ($element.parent().is(":nth-child(4)")) {
				$("main .content").append('<div class="container"> <div class="container__item"> <input class="form__field" placeholder="Новая задача" /> <button type="button" class="input_btn">+</button> </div> </div>');
				$(".input_btn").on("click", function () {
					if (($(".form__field").val() !== "") && (($(".form__field").val()).trim().length > 0)){
						var newToDo = $('.form__field').val();

						if (newToDo != '') {
							toDos.push( newToDo);
							alert('Новое задание "'+newToDo+'" успешно добавлено!');
							$('.form__field').val("");
						}
					}
				});

				$(".form__field").on("keypress", function (event) {
					if (event.keyCode === 13) {
						if (($(".form__field").val() !== "") && (($(".form__field").val()).trim().length > 0)){
							var newToDo= $('.form__field').val();
							
							if (newToDo!='') {
								toDos.push( newToDo);
								alert('Новое задание "'+newToDo+'" успешно добавлено!');
								$('.form__field').val("");
							}
						}
					}
				});
			}
		});
	});
	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(function() {
	$.ajaxPrefilter( "json script", function( options ) {
  options.crossDomain = true;
});
	$.getJSON("todos.json", function (toDoObjects) {
		main(toDoObjects);
	});
});