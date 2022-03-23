$(function(){ // $(document).ready(function(){ });
    var gift = $('#gift > li');//보이는 이미지 1, 2, 3
    var sub_bot = $('#sub_botton > li');// 버튼1 , 2, 3
    var cur = 0; //현재 보이는 이미지의 일련번호
    var setIntervalId;
    
   sub_bot.on({
        click:function(){
            var eg = $(this);// 마우스이벤트가 적용된 버튼 자신
            var e = eg.index();// 자신을 형제들과 비교해서 일련번호를 부여

            sub_bot.removeClass('sub_on');
            eg.addClass('sub_on');

            move(e);//부여된 일련번호 함수 호출하면서 전송
        }
    });
   
    
    function move(e){
        if(cur == e) return;//현재 보이는 이미지에 번호와 클린버튼 일련번호를 비교
        
        var curEl = gift.eq(cur);
        var nextEl = gift.eq(e);
        
        curEl.css({left:0}).stop().animate({left:'-100%'});
        nextEl.css({left:'100%'}).stop().animate({left:0});

        cur= e;
    }
});