import React from "react";
import styled,{css} from 'styled-components';

// react-icons
// (https://react-icons.github.io/react-icons/#/)
// yarn add react-icons
import {MdDone, MdDelete } from 'react-icons/md';
// import { FcAssistant } from "react-icons/fc";

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
`;

const CheckCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${props => props.done && css`border: 1px solid #38d9a9;`}
`;

const Text = styled.div`
   flex: 1;
   font-size: 21px;
   color: #495057;
   ${props => props.done && 
    css`color: #ced4da;`}
`;
const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
`;


function TodoItem({id, done, text}){

   const onToggle = () => {};
   const onRemove = () => {};

   return(
       <TodoItemBlock>
          <CheckCircle done={done} onClick={onToggle}> {done && <MdDone/>} </CheckCircle>
          <Text done={done}> {text} </Text>
          <Remove onAuxClick={onRemove}> <MdDelete/> </Remove>
          {/* <FcAssistant/> */}
       </TodoItemBlock>
   )
}

export default TodoItem;