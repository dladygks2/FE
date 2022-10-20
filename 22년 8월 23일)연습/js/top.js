$(document).ready(function(){
    $(".down_mn").hide();

    $(".mainTab > div").hover(function(){
        $(".down_mn").stop(1000).slideDown(300); 
    }, function(){
        $(".down_mn").stop(1000).slideUp(500);
    });

    $(".down_mn").hover(function(){
        $(".down_mn").stop(1000).slideDown(300); 
    }, function(){
        $(".down_mn").stop(1000).slideUp(500);
    });
});