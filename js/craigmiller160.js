/* CraigMiller160 GitHub Page JavaScript */
var contentChanger = {
	handleChangeEvent: function (event){
	    if(event.type === "click"){
	        var page = $(this).attr("page");
	        var target = $(this).attr("target");

	        $("[target='" + target + "']").parent("li").removeClass("active");
	        
        if($(this).parent().prop("nodeName") === "LI"){
            $(this).parent().addClass("active");
        }

        $("#" + target).fadeOut(200, function(){
        	$("#" + target).load("content/" + page + ".html", function(){
        		$("#" + target).fadeIn(200);
        	});
        });
	    }
	    event.preventDefault();
	},
	change: function(page, target){
		//TODO learn more about scopes/closures/objects, and then try to link this function to the above one
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