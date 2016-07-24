/* CraigMiller160 GitHub Page JavaScript */
var contentChanger = {
	displayedContent: {},
	handleChangeEvent: function (event){
	    if(event.type === "click"){
	        var page = $(this).attr("page");
	        var target = $(this).attr("target");

	        contentChanger.change(page, target, $(this));
	    }
	    event.preventDefault();
	},
	change: function(page, target, node){
		$("[target='" + target + "']").parent("li").removeClass("active");

		if(node !== undefined && node.parent().prop("nodeName") === "LI"){
            node.parent().addClass("active");
        }

        if(contentChanger.displayedContent[target] !== page){
			$("#" + target).fadeOut(200, function(){
				$("#" + target).load("content/" + page + ".html", function(){
					$("#" + target).fadeIn(200);
				});
			});
			contentChanger.displayedContent[target] = page;
        }
	}
};

function setAge(){
	$(".craig-age").html(function(){
        var birthdate = new Date(1988, 9, 26);
        var today = Date.now();
        var ageDate = new Date(today - birthdate);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    });
};

function initPage(){
	$(".content-change").click(contentChanger.handleChangeEvent);
    setAge();
};

$(document).ready(initPage);