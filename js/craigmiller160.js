/* CraigMiller160 GitHub Page JavaScript */

var cm160 = (function(){

	var contentChanger = (function(){
		var displayedContent = [];
		var initContainers = [];

		function handleChangeEvent (event){
			if(event.type === "click"){
		        var page = $(this).attr("page");
		        var target = $(this).attr("target");

		        change(page, target);
		    }
		    event.preventDefault();
		}

		function change (page, target){
			$("[target='" + target + "']").parent("li").removeClass("active");
			$(".cm160-change-content[page='" + page + "'").parent("li").addClass("active");

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
				if(initContainers[$(this).attr("id")] === undefined){
					var page = $(this).attr("defaultPage");
					change(page, $(this).attr("id"));
					initContainers[$(this).attr("id")] = $(this);
				}
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
		var autoSlideMap = [];

		function addImage(src, alt, index, name){
			var imgDiv = $("<div/>");
			imgDiv.addClass("cm160-img-container");
			
			var img = $("<img/>");
			img.attr("src", src);
			img.attr("alt", alt);
			img.addClass("cm160-img");
			img.addClass("img-responsive");
			imgDiv.append(img);

			var caption = $("<h2/>");
			// caption.text("Testing 12345 This is a test of size");
			caption.text(alt);
			caption.addClass("cm160-img-caption");
			imgDiv.append(caption);
			
			$(imagesDivMap[name]).append(imgDiv);
			if(index > 0){
				$(imgDiv).hide();
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
			//TODO make sure this works with alternate slideshows
			$(".cm160-img-container").eq(oldIndex).fadeOut(200, function(){
				$(".cm160-img-container").eq(currentIndex).fadeIn(200);
			});
		}

		function start(name){
			currentIndexMap[name] = 0;

			$(".cm160-slideshow").each(function(){
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

				if(autoSlideMap[name] !== undefined){
					clearInterval(autoSlideMap[name]);
				}

				var autoSlide = setInterval(function(){
					var oldIndex = currentIndexMap[name];
					currentIndexMap[name] += 1;
					if (currentIndexMap[name] > data.images.length - 1){
						currentIndexMap[name] = 0;
					}

					cycle(oldIndex, currentIndexMap[name]);
				}, 4000);

				autoSlideMap[name] = autoSlide;
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