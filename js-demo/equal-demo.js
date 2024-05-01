const check = (equals) => {
    if (equals) {
        console.log("같다.");
    } else {
        console.log("같지 않다.");
    }
};

const equeal1 = (1 == "1");
const equeal2 = (1 === "1");

// "==" 연산자 -> 같다
check(equeal1);

// "===" 연산자 -> 같지 않다.
check(equeal2);

// 따라서 "=="은 자료형에 상관 없이 값을 확인
// "==="은 자료형과 값까지 확인
