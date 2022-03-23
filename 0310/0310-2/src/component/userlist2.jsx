import React, { useEffect } from 'react';

function User({user,onRemove,onToggle}){
    useEffect(() => {
        console.log(user);
    });

    return(
        <>//배열요소 하나씩 화면에 출력
         <b style ={{
              cursor: 'pointer',
              color:user.active ? 'deeppink' : 'black'//조건부 렌더링에 의해서 글자색의 변화
         }}
         onClick={() => onToggle(user.id)}>{user.username}</b><span>({user.email})</span>
         <button onClick={() => onRemove(user.id)}>삭제</button>
        </>
    )
}


function UserList2({users, onRemove, onToggle}){ 

  return(
      <>
      {users.map( user => (
           <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
       ))}

      </>
  )
};

export default UserList2;