import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import Box from './components/box';
import CheckBox from './components/checkbox';

const Circle  = styled.div`
  width:150px;
  height:150px;
  background:${props => props.color || 'black' };
  border-radius:50%;

  ${props =>
    props.big && css`
     width: 300px;
     height: 300px;
   `}
`;



function App() {


  const [check, setCheck] = useState(false);//체크가 안된상태를 기본값
  
  const onChange = e => {
    setCheck(e.target.checked)
  }

  return (
    <>
      <Box/>
      <Circle/>
      <Circle color='skyblue'/>
      <Circle color='red' big/>

      <CheckBox onChange={onChange} checked={check}>
        약관에 모두 동의
      </CheckBox>
      <p>
        <b>check : </b>{check ? 'true' : 'false'}
      </p>
    </>
  );
}

export default App;
