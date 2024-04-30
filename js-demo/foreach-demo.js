// object -------------------------------

const user1 = {
    name : "홍길동",
    age : 20,
    address : "서울"
}

const user2 = {
    name : "장발장",
    age : 21,
    address : "이탈리아"
}

const arr = [user1, user2];

// object -------------------------------

// function -------------------------------

// foreach 인자 1개 -> 각 원소를 순회하면서 출력
const showForeach1 = () => {
    arr.forEach((user)=>{
        console.log(`${user.name}은(는) ${user.address}에 삽니다.`);
    });
}

// foreach 인자 2개 -> 원소, 인덱스
const showForeach2 = () => {
    arr.forEach((user, index)=>{
        console.log(`${index+1}번째 학생인 ${user.name}은(는) ${user.address}에 삽니다.`);
    });
}

// foreach 인자 3개 -> 원소, 인덱스, arr전체
const showForeach3 = () => {
    arr.forEach((user, index, all)=>{
        console.log(`${index+1}번째 학생인 ${user.name}은(는) ${user.address}에 삽니다.`);
        console.log('전체 학생 리스트')
        all.forEach((each)=>{
            console.log(each);
        });
        
    });
}


// function -------------------------------

// demo -------------------------------

showForeach1();
showForeach2();
showForeach3();

// demo -------------------------------
