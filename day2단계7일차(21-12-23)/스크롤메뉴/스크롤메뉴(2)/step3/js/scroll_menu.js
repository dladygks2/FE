 $("#home").toggle(
	   function(){
		   $("ul").stop().animate({left:"50px"},500);
	   },
	   function(){
		   $("ul").stop().animate({left:"-600px"},500);
	   }
   );

   $("li").hover(
	   function(){
		   $(this).animate({opacity:1},300);
	   },
	   function(){
		$(this).animate({opacity:0.7},300);
	   }	
   );



   $("#home").mousemove(function(e){  
	var pos = e.pageY - parseInt($("#container").css("height"))/2+"px";
	$("#container").css({"top":pos});

   }); 