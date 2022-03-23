import React from 'react';
import styled from 'styled-components'
import { useTodoState } from '../todoContext';

const TodoHeadBlock = styled.div`
    padding: 48px 32px 24px 32px;
    border-bottom: 1px solid #e9ecef;

    h1{
        margin: 0;
        font-size: 36px;
        color: #343a40;
    }

    .day{
        margin-top: 4px;
        color: #868e96;
        font-size: 21px;
    }

    .tasks-left{
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }
`;


function TodoHead() {
    const todos = useTodoState(); //체크가 되지 않는 부분의 상태를 확인 하는 함수
    const undoneTasks = todos.filter(todo => !todo.done); //체크 되지 않은 상태 
    //filte -> 조건을 제시하고 그에 따른 결과 리턴
    //map -> 배열요소만큼 실행

    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
       year: 'numeric',
       month: 'long',
       day: 'numeric'
    }); 
   const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  return (
   <TodoHeadBlock>
       <h1>{dateString}</h1> 
       <div className='day'>{dayName}</div>
       <div className='tasks-left'>오늘 할일 {undoneTasks.length}개 남음</div>
   </TodoHeadBlock>
  );
}

export default TodoHead;
