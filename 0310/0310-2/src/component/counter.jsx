import React,{useState} from "react";
// 리액트 패키지에서 useState라는 hooks를 불러옴

function Counter(){
   const [number, setNumber] = useState(0);

    const plus = () => {
        setNumber(number + 1);
        console.log('1 더했어요');
    }
    const minus = () => {
        setNumber(number + 2);
        console.log('1 뺐어요');
    }

    return(
        <>
            <h2>{number}</h2>
            <button onClick={plus}>더하기</button>
            <button onClick={minus}>빼기</button>
        </>
    )
}
export default Counter;