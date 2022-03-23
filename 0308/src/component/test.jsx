import './test.css'

function Test(){
    //내부에서 스타일을 선언(객체형으로 선언)
    const style = {
        backgroundColor: 'deepskyblue',
        color: 'white',
        fontSize: 40,
        padding: '1rem'
    }

    return(
    <>
      <div style={style}>test1004(내부스타일시트)</div>
      <div className = 'test1004'>test1004(외부스타일시트)</div>
      {/* css를 적용하는 방법 : className 속성에 적용 */}
      {/* id로 선언하게 되면 컴포넌트를 재사용을 했을때 같은 id가 
      여러번 선언되는 상황이 되므로 그런상화을 피하기 위해서 클래스로 
      선택자 설정*/}
    </>
    )
  }

 export default Test;