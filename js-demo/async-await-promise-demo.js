// promise

// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("Done!"), 3000);
//     // 성공 -> resolve 반환
//     // 실패 -> reject 반환
// });

// promise.then((res)=>{
//     // 콜백함수를 실행한 결과를 출력
//     console.log(res);
//     // 다음 then을 실행시키기 위한 리턴
//     return res + " 그리고 ";
// }).then((res)=>{
//     // 콜백함수를 실행한 결과를 출력
//     console.log(res + "Two Done");
// }).catch((err)=>{
//     console.log("실패:"+err);
//     // 콜백함수 실행 시, 에러 발생하면 출력
// });

// // async & await

// // async 함수 : promise 객체를 반환
// const funA = async () => {
//     return 7;
//     // == return Promise.resolve(7);
// }

// // async 사용법 1 : 함수 밖에서 then
// funA().then((res)=>{
//     console.log("A:"+res);
// }).catch((err)=>{
//     console.log(err);
// });

// // async 사용법 2 : 함수 안에서 await
// const funB = async () => {
//     // await 은 promise 객체 결과를 받을 때까지 기다리게 한다.
//     let re = await promise;
//     console.log("B"+re);
// }

// funB();

//Promise 3개 순서대로 실행시키기
const funC = async() => {
    let promiseA = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("A");
        }, 1000);
    });

    let resultA = await promiseA;
    console.log(resultA);

    let promiseB = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(resultA + "B");
        }, 1000);
    });

    let resultB = await promiseB;
    console.log(resultB);

    let promiseC = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(resultB + "C");
        }, 1000);
    });

    let resultC = await promiseC;

    console.log(resultC);
}

funC();