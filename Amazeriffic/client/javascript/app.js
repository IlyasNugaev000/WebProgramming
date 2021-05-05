var tagIndex = function (tag, tagsList) {
	var i;
	for (i=0;i<tagsList.length;i++) {
		if (tagsList[i].name.localeCompare(tag)==0) return i;
	}
	return -1;
};


var organizeByTags = function (toDosList) {
	var organizedByTags = [];
	toDosList.forEach(function (toDoItem) { // toDoItem = { "description":"...", "tags":[...] }
		toDoItem.tags.forEach(function (tagItem) { // tagItem="..."
			var ind=tagIndex(tagItem, organizedByTags);
			if (ind==-1) {
				organizedByTags.push({
					"name": tagItem,
					"toDos": [toDoItem.description]
				});
			}
			else organizedByTags[ind].toDos.push(toDoItem.description);
		});
	});
	return organizedByTags;
};


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
				var organizedByTag = organizeByTags(toDoObjects);

				organizedByTag.forEach(function (tag) {
					var $tagName=$("<h3>").text(tag.name);
					var $content=$("<ul>");

					tag.toDos.forEach(function (description) {
						var $task=$("<li>").text(description);
						$content.append($task);
					});

					$("main .content").append($tagName);
					$("main .content").append($content);
				});
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
	$.getJSON("todos.json", function (toDoObjects) {
		main(toDoObjects);
	});
});