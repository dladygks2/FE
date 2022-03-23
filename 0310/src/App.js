import React from 'react';
import Hello from './component/hello';

const style = {
  backgroundColor: 'deepskyblue',
  color: 'red',
  fontSize: 40,
  padding: '1rem'
}

function App() {
  const name='apple';
   return( 
    <div>
      <div style={{style}}></div>
      {/* <div>{name}</div> 컴포넌트내에서 특정값을 전달 */}
      <Hello name="apple" color="gold" isSpecial={true}/>{/* 자식 컴포넌트로 특정값을 전달 할때 선언  */}
    </div>
  );
}

export default App;
