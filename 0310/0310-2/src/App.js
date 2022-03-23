import React, { useRef, useState, useMemo }  from "react";
//import Counter from "./component/counter";
//import Input from "./component/input";
//import MultiInput from './component/multiinput';
//import UserList from "./component/userlist";
import CreateUser from "./component/createUser";
import UserList2 from "./component/userlist2";


function App() {
  const onChange = e => {

  }

  const [users, setUsers] = useState([
    { //user
        id: 1,
        username: '김사과',
        email: 'apple@apple.com'
    },
    {
        id: 2,
        username: '오렌지',
        email: 'orange@orange.com'
    },
    {
        id: 3,
        username: '반하나',
        email: 'banana@banana.com'
    },
    {
        id: 4,
        username: '이메론',
        email: 'melon@melon.com'
    },
    {
        id: 5,
        username: '배애리',
        email: 'berry@berry.com'
    }
]);

const onCreate = () => {}
const onRemove = () => {}
const onToggle = () => {}
const count = useMemo( () => {})

  return (
    <>
    {/* <Counter/> */}
    {/* <Input/> */}
    {/* <MultiInput/> */}
    {/* <UserList/> */}
    <CreateUser
    //  username={username}
    //  email={email}
     onChange={onChange}
     onCreate={onCreate}
    />
    <UserList2 users={users} onRemove={onRemove} onToggle={onToggle}/>
    <div>선택된 사용자 수 : {count}</div>
    </>
  );
}

export default App;
