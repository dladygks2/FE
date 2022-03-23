import React from 'react';

function Hello({color, name, isSpecial}){//{color, name}부모의 컴포넌트에 속성명을 매개변수처럼 연결
   return(
       <div >
            {color},{name} {/*원하는 곳에 객체형태에 대입을 하면 특정값이 전달*/}
            {/* <div style={{color}}></div> */}

            { isSpecial ? <b>☆</b> : null } 안녕하세요 { name }
            { isSpecial && <b>☆</b> } 안녕하세요 { name }
       </div>
   )
}
// Hello.defaultProps = {
//     color: 'pink',
//     name: '무명'
// }
export default Hello;