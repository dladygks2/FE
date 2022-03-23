import React from 'react';
import {createGlobalStyle} from 'styled-components'
import TodoTemplate from "./components/todoTemplate";
import TodoHead from './components/todoheade';
import TodoList from './components/todolist';
import TodoCreate from './components/todoCreate';
//import { TodoProvider } from './todoContext';

const GlobalStyle = createGlobalStyle`
 body{
   background-color:skyblue;
 }
`;

function App() {
  return (
   <>
     {/* <TodoProvider> */}
      <GlobalStyle/>{/* body부분 컴포넌트 배경색상설정 */}
      <TodoTemplate>{/* 그룹역활 */}
          <TodoHead/>
          <TodoList/>
          <TodoCreate/>
      </TodoTemplate>
     {/* </TodoProvider> */}
   </>
  );
}

export default App;
