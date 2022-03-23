import React,{useState} from "react";
// 리액트 패키지에서 useState라는 hooks를 불러옴

function Input(){
    const [text, setText] = useState('');
    
    const onChange = (e) => {
        setText(e.target.value);
    }
    const onReset = () => {
        setText('');
    }

    return(
        <>        
            <input onChange={onChange} value={text}/>&nbsp;
            <button onClick={onReset}>지우기</button>
            <div>
                <b>값: {text}</b>
            </div>
        </>
    )
}
export default Input;