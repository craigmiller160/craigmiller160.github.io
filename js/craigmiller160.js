/* CraigMiller160 GitHub Page JavaScript */

var cm160 = (function(){

	var contentChanger = (function(){
		var displayedContent = [];

		function handleChangeEvent (event){
			if(event.type === "click"){
		        var page = $(this).attr("page");
		        var target = $(this).attr("target");

		        change(page, target, $(this)); //TODO how to handle this
		    }
		    event.preventDefault();
		}

		function change (page, target, node){
			if(node !== null && node !== undefined && node.parent().prop("nodeName") === "LI"){
				$("[target='" + target + "']").parent("li").removeClass("active");
	            node.parent().addClass("active");
	        }

	        if(displayedContent[target] !== page){
				$("#" + target).fadeOut(200, function(){
					$("#" + target).load("content/" + page + ".html", function(){
						$("#" + target).fadeIn(200);
					});
				});
				displayedContent[target] = page;
	        }
		}

		function init(){
			$(".cm160-content-container").each(function(){
				var page = $(this).attr("defaultPage");
				change(page, $(this).attr("id"));
			});
			$(".cm160-change-content").click(handleChangeEvent);
		}

		return {
			"init": init
		}
	})();


	var slideshow = (function(){
		var currentIndexMap = [];
		var imagesDivMap = [];

		function addImage(src, alt, index, name){
			var img = $("<img/>");
			img.addClass("cm160-slideshow"); //TODO make this class more unique

			img.attr("src", src);
			img.attr("alt", alt);
			$(imagesDivMap[name]).append(img);
			if(index > 0){
				$(img).hide();
			}
		}

		function preload(imgArray, name){
			$.each(imgArray, function(index, value){
				var image = new Image();
				image.onload = function(){
					addImage(image.src, value.alt, index, name);
				};
				image.onerror = function(){
					console.log("Error loading image: " + value.src);
					addImage("", value.alt, index, name);
				};
				image.src = value.src;
			});
		}

		function cycle(oldIndex, currentIndex) {
			$(".cm160-slideshow").eq(oldIndex).fadeOut(200, function(){
				$(".cm160-slideshow").eq(currentIndex).fadeIn(200);
			});
		}

		function start(name){
			currentIndexMap[name] = 0;

			$(".cm160-img-container").each(function(){
				if(name === this.id){
					imagesDivMap[name] = this;
					return false;
				}
			});

			if(imagesDivMap[name] === undefined){
				console.log("No div exists with class 'img-slideshow' and id '" + name + "'");
				return;
			}

			$.getJSON("content/slideshow-" + name + ".json", function (data){
				preload(data.images, name);

				var autoSlide = setInterval(function(){
					var oldIndex = currentIndexMap[name];
					currentIndexMap[name] += 1;
					if (currentIndexMap[name] > data.images.length - 1){
						currentIndexMap[name] = 0;
					}

					cycle(oldIndex, currentIndexMap[name]);
				}, 3000);
			});
		}

		return {
			"start": start
		}

	})();


	function setAge(){
		var birthdate = new Date(1988, 9, 26);
        var today = Date.now();
        var ageDate = new Date(today - birthdate);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
	}


	return {
		"setAge": setAge,
		"contentChanger": contentChanger,
		"slideshow": slideshow
	}

})();