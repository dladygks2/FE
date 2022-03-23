const dog = {
    name: '루시',    
}

//console.log(dog);

// const cuteDog = {
//     name: '루시',
//     attribute: 'cute'
// }
const cuteDog ={
    ...dog,
    attribute: 'cute'
}
//기존객체에 속성과속성값추가시  기존객체를 ...객체명, 추가되는 속성:속성값 입력해서 사용
//console.log(cuteDog);

const whitecuteDog = {
    ...cuteDog,
    color: 'white'
}
//console.log(whitecuteDog);


// 기존 객체를 사용하면서 수정하지 않은 상태로 새로운 객체를 만들어 내는 방법


const dog01 = {
    name:'포비',
    age:5,
    color:'white'
}

function print({name,age,color}){
     console.log(`우리집 강이지 이름은 ${name}이고 나이는${age}이며 ${color}색이다`);
}
//print(dog01);


// const student = {'apple':'김사과','banana':'오렌지','orange':'반하나'}

// const {apple, banana, orange} =student;

//console.log(student.apple);
// console.log(apple);
// console.log(banana);
// console.log(orange);


const student = ['김사과','오렌지','반하나']

const [apple, banana, orange] =student;

//console.log(student.apple);
console.log(apple);
console.log(banana);
console.log(orange);

