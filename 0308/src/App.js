import Menu from './component/menu';
import Contents from './component/contents';
import Footer_in from './component/footer_in';
import Copyright from './component/copyright';
//import Test from "./component/test";//외부에 연결된 컴포넌트
import './app.css';


//내부 컴포넌트 선언
function App() {
  function Test01(){
    return(
      <div>test01</div>
    )
  }

  return (
    <>
      <div className="header">
        <div className='header_in'>
          <div className='logo'>logo</div>
          <Menu/>         
        </div>
      </div>
      <div className="main_img"></div>
      <Contents/>
      <div className="footer">
        <Footer_in>
           <div className='logo2'>logo2</div>
           <Copyright>
             <div className='copy01'>copy01</div>
             <div className='copy02'>copy02</div>
           </Copyright>
        </Footer_in>   
      </div>


      {/* <h2>리액트제목입니다</h2>
      <div>test01</div>
      <div><p>test02</p></div>
      <p>test03</p>
      <Test/>
      <Test/>
      <Test/>
      <Test01/> */}
    </>
  );
}

export default App;


