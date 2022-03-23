$(function(){ // $(document).ready(function(){ });
    var visual = $('#brandVisual > li');//보이는 이미지 1, 2, 3
    var button = $('#buttonList > li');// 버튼1 , 2, 3
    var current = 0; //현재 보이는 이미지의 일련번호
    var setIntervalId;
    
    button.on({
        click:function(){
            var tg = $(this);// 마우스이벤트가 적용된 버튼 자신
            var i = tg.index();// 자신을 형제들과 비교해서 일련번호를 부여

            button.removeClass('on');
            tg.addClass('on');

            move(i);//부여된 일련번호 함수 호출하면서 전송
        }
    });
    /*
    $('#buttonList > li').on({
        mouseover:function(){
            clearInterval(setIntervalId);
        },
        mouseout:function(){
            timer();
        }
    });
    
    timer();
    function timer(){
        setIntervalId = setInterval(function(){
            var n = current + 1;
            if(n == visual.size()){
                n = 0;
            }
            
            button.eq(n).trigger('click');
        }, 4000);
    }
	*/
    
    function move(i){
        if(current == i) return;//현재 보이는 이미지에 번호와 클린버튼 일련번호를 비교
        
        var currentEl = visual.eq(current);
        var nextEl = visual.eq(i);
        
        currentEl.css({left:0}).stop().animate({left:'-100%'});
        nextEl.css({left:'100%'}).stop().animate({left:0});

        current = i;
    }
});