/* CraigMiller160 GitHub Page JavaScript */
function contentChange(event){
    if(event.type === "click"){
        var page = $(this).attr("page");
        var target = $(this).attr("target");
        
        $("[target='" + target + "']").parent("li").removeClass("active");
        
        if($(this).parent().prop("nodeName") === "LI"){
            $(this).parent().addClass("active");
        }
        $("#" + target).fadeOut(0).fadeIn("slow").load("content/" + page + ".html");
    }
    event.preventDefault();
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
	$(".content-change").click(contentChange);
    setAge();
};

$(document).ready(initPage);