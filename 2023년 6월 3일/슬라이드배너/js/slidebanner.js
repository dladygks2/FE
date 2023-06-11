$(function(){

    var current = 0;    // 처음 페이지가 열리면 보이는 인덱스 값

    $("#btns > li").click(function (){
        var i = $(this).index();    // 얘는 0~3까지 인덱스가 지정되겠네
        // console.log(i);

        move(i); // 해당되는 버튼의 인덱스 값을 담아서 실행
    });

    // 자동실행
    // setInterval(실행문, 시간) => 실행문이 정해진 시간간격으로 실행됨
    timer();    // 함수 호출
    function timer(){
        setInterval(function(){
            var n = current + 1; // 0 1 2 3
            if(n == 4){
                n = 0;
            } 
            move(n);
        }, 3000);
        
    }

    // 애니메이션 함수
    function move(n){
        // 이 부분을 사용할 때는 'left:' 속성이 들어가 있어야한다

        // 현재 뜬 창과 클릭된 버튼의 인덱스 값이 같으면 그냥 return;
        if(current == n) return;    

        var currentEl = $("#view ul li").eq(current);
        var nextEl = $("#view ul li").eq(n);

        currentEl.css({left:"0%"}).animate({left:"-100%"});
        nextEl.css({left:"100%"}).animate({left:"0%"});

        current = n;    // 현재 보이는 인덱스의 값
    }
    


});