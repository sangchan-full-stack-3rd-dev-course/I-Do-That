// foreach와 map의 차이

arr = [1,2,3,4,5]

const foreachResult = arr.forEach((i)=>{
    return i * 2;
});

const mapResult = arr.map((i)=>{
    return i * 3;
});

// 결과
console.log(arr);
console.log(foreachResult);
console.log(mapResult);

// 이를 통해 map은 반환 값이 있지만 forEach는 없다는 것을 알 수 있다!