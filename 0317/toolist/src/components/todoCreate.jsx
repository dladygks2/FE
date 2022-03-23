import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
//import { useTodoDispatch, useTodoNextd } from '../todoContext';
import {useTodoDispatch, useTodoNextId} from '../todoContext';

 const CircleButton = styled.button`
   display: flex;
   align-items: center;
   justify-content: center;

   position: absolute;
   left: 50%;
   bottom: 0;
   width: 80px;
   height: 80px;
   transform: translate(-50%, 50%);

   font-size: 60px;
   color: white;
   border-radius: 40px;
   border: none;
   outline: none;

   z-index: 5;
   cursor: pointer;
   background-color: #38d9a9;
  

   &:hover {
    background-color: #63e6be;
   }
   &:active {
    background-color: #20c997;
   }

   transition: all 0.3s;
                     
   ${(props) =>
    props.open && 
    css`
    background-color: #ff6b6b;
    &:hover {
      background-color: #ff8787;
    }
    &:active {
      background-color: #fa5252;
    }
    transform: translate(-50%, 50%) rotate(45deg);
    `}
 `;



 const InsertFormPositioner = styled.div`
        width: 100%;
        bottom: 0;
        left: 0;
        position: absolute;
 `;
 
 const InsertForm = styled.form`
        background: #f8f9fa;
        padding: 32px 32px 72px 32px;

        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
        border-top: 1px solid #e9ecef;

        
 `;
 
 const Input = styled.input`
        padding: 12px;
        border-radius: 4px;
        border: 1px solid #dee2e6;
        width: 100%;
        outline: none;
        font-size: 18px;
        box-sizing: border-box;
 `;


function TodoCreate(){

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId(); 
   
    // <InsertFormPositioner>부분에 보이고 숨김에 대해서 초기값 설정
    const [open, setOpen] = useState(false);
    // <Input> 할일을 입력한 필드에 초기값설정
    const [value, setValue] = useState('');

    const onToggle = () => setOpen(!open);
    const onchange = e => setValue(e.target.value);
    const onSubmit = e => {
      dispatch({
        type: 'CREATE',
        todo: {
          id: nextId.current,
          text: value,
          done: false
        }
      })
      setValue('');
      setOpen(false);
      nextId.current += 1;
    }
            

   return(
       <>
        {/* 기본으로 숨김 이벤트에 의해서 보이게 하고 일정추가 입력폼 */}
        {open && (
        <InsertFormPositioner>
            <InsertForm onSubmit={onSubmit}>
               <Input placeholder="할 일을 입력 후, Enter를 누르세요"
                     onChange={onchange}
                     value={value}
                />
            </InsertForm>
        </InsertFormPositioner>
         )}



        {/*  일정추가아이콘  */}
        <CircleButton onClick={onToggle} open={open}>
             <MdAdd/>
        </CircleButton>
       </>
   );
}


export default React.memo(TodoCreate);//항목이 업데이트 되었을때 불필요한 렌더링을 방지하여 성능을 최적화
  
