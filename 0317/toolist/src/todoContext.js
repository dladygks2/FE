import React, { useReducer, createContext, useContext, useRef } from 'react';
// yarn add redux


const initialTodos = [
    {
        id: 1,
        text: '프론트엔드 프로젝트 만들기',
        done: false
    },
    {
        id: 2,
        text: '밥 잘 챙겨먹기',
        done: true
    },
    {
        id: 3,
        text: '운동하기',
        done: true
    },
    {
        id: 4,
        text: '일기쓰기',
        done: false
    }
];

function todoReducer(state, action){
    switch(action.type){
        case 'CREATE':
            return state.concat(action.todo);
        
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo );

        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        
        default:
            throw new Error(`${action.type}이 잘못 전달됨`);
    }
}

//
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    return (
        //TodoProvider를 렌더링하고 value값을 설정 -> props로 받아온  children값을 내부에 렌더링함
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState(){ //헤드부분연결되는함수 value={state}
    const context = useContext(TodoStateContext); //value값으로 가기위해 경로 설정
    if(!context){
        throw new Error('TodoProvider를 찾을 수 없음');
    }
    return context;
}
// export function useTodoState() {
//  return useContext(TodoStateContext);
//}


export function useTodoDispatch(){
    const context = useContext(TodoDispatchContext);
    if(!context){
        throw new Error('TodoProvider를 찾을 수 없음');
    }
    return context;
}

export function useTodoNextId(){
    const context = useContext(TodoNextIdContext);
    if(!context){
        throw new Error('TodoProvider를 찾을 수 없음');
    }
    return context;
}