import React from 'react';
import './App.css';
//라우터함수  yarn add react-router-dom
// yarn add react-router-dom@5
import { Route, Link } from 'react-router-dom';
import Home from './home';
import About from './about';
import Profiles01 from './profiles01';
import Profiles from './profiles';


function App() {
  return (
   <div>
   {/* <Route path="주소" component={보여줄 컴포넌트}> */}
   {/* <a href="주소">문자</a> */}
   {/* <Link to="주소">문자</Link> */}
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필 목록</Link>
        </li>
        <li>
          <Link to="/profiles01">프로필 목록01</Link>
        </li>
        <li>
          <Link to="/history">history 예제</Link>
        </li>
      </ul>
        <div> 
          <Route path="/" exact={true} component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/profiles" component={Profiles}/>
          <Route path="/profiles01" component={Profiles01}/>
          {/* 
          <Route path="/history" component={HistorySample}/> */}
        </div>
   </div>
  );
}

export default App;
