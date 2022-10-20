$(document).ready(function(){
   
    //메인메뉴작업
    
    $(".s_mn").hide(); //css({display:"none"})

    $(".m_mn > li").hover(function(){
        // $(this).find(".s_mn").show();
        // $(this).find(".s_mn").fadeIn();
        // $(this).find(".s_mn").animate({속성:"속성값",속성:"속성값"},시간);
        $(this).find(".s_mn").slideDown()
        
        },
        function(){
            $(".s_mn").hide();
        }
    );

    //버튼위에 마우스를 올렸을때 효과
    $(".m_mn > li").find("a").hover(
        function(){
            $(this).css({color:"red"});
        },
        function(){
            $(this).css({color:"#333333"});
        }
    );




    //메인이미지슬라이드
    var current = 0;//첫번째 메인슬라이드 이미지번호
    var setIntervalId;//전역변수


    $(".btns > li").click(function(e){
       e.preventDefault(); //a태그의 이벤트 기능을 취소
       var i = $(this).index();
       movie(i);
    });

    $('.l_btn').click(function(){
      var l = current + 1;
      if(l == 3){//범위를 벗어나지 못하게 최대 조건값을 제한
        l = 0;
      } 
      movie(l);
    });

    $('.r_btn').click(function(){
        var r = current + 1;
        if(r == 3){//범위를 벗어나지 못하게 최대 조건값을 제한
            r = 0;
          } 
        movie_r(r);
    });


    $("#main_img").mouseover(function(){
        clearInterval(setIntervalId);
    });
    $("#main_img").mouseout(function(){
        timer();//마우스이벤트의해서 함수 호출
    });


    timer();//기본적으로 실행 하기위해 함수호출
    function timer(){
     //setInterval(실행문, 시간):시간마다 함수를 실행
     //clearInterval(setInterval함수) setInterval 실행을 취소
     setIntervalId = setInterval(function(){
       var n = current + 1; //1 2 3 4 5 6 7(지역변수)
       if(n == 3){//범위를 벗어나지 못하게 최대 조건값을 제한
          n = 0;
       }
       movie(n);
     },3000)
    }

   
    function movie(n){  
     var currentEl = $(".imgs > li").eq(current);
     var nextEl = $(".imgs > li").eq(n);
     currentEl.css({left:'0%'}).animate({left:'-100%'});
     nextEl.css({left:'100%'}).animate({left:'0%'});

     current = n
    }


    function movie_r(n){  
        var currentEl = $(".imgs > li").eq(current);
        var nextEl = $(".imgs > li").eq(n);
        currentEl.css({left:'0%'}).animate({left:'100%'});
        nextEl.css({left:'-100%'}).animate({left:'0%'});
   
        current = n
    }
   
   
    //오른쪽 퀵메뉴
    var box = $('#all > .box');

    $('#q_mn li').click(function(){
      var nn = $(this).index(); //버튼의 번호를 찾는거
      //console.log(nn);
      var tt = box.eq(nn); //버튼번호와 동일 box
      var tg = tt.offset().top; //위치를 이동할때 기준이 될 box 기준점을 설정
      $('html,body').stop().animate({scrollTop:tg});
    });

    $(window).scroll(function(){
        var sct = $(window).scrollTop() + 200;
        $('#q_mn').stop().animate({top:sct + "px"},500);
    });


  //콘텐츠01에 슬라이드 이미지 설정
  
   $(".con01_btns > li").click(function(){
      
           var num = $(this).index();

           slide_img(num);

   });
    function slide_img(num){
        pos = num * -360 + "px";
        $('.in_box > ul').animate({left:pos},1000);
    }


// 하단에서 특정요소 활용하여 주변 태그의 속성 조절   

    $('#footer .logo').click(function(){
        $('.addr').animate({width:'100px'},1500);
    });

     $('.btn1').click(function(){
        $('.addr').animate({width:'600px'},1000);
     })



     $('.con05').mouseover(function(){
        $('.con05').animate({width:'50px'})
     });

     $('.con05 > h3').click(function(){
        $('.con05').animate({width:'640px'})
     });

});