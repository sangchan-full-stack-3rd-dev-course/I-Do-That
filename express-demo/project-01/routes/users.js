const express = require('express');
const router = express.Router();

let user1 = {
    userId : "gkgk00142",
    name : "헝컹이",
    password : "1234"
}

let user2 = {
    userId : "gkgk00143",
    name : "헝컹둘",
    password : "12345"
}


let userMap = new Map();

userMap.set(1, user1);
userMap.set(2, user2);

// 개별 조회
router.route("/:id").
get((req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    
    let result = {
        code : 200,
        msg : ""
    };

    let user = userMap.get(id);

    if (!user) {
        result.code = 404;
        result.msg = "해당 유저는 존재하지 않습니다."
    } else {
        user.id = id;
    }

    res.status(result.code).json({
        message : result.msg,
        user : user
    });
}).delete((req, res)=>{
    let {id} = req.params;
    id = parseInt(id);

    let result = {
        code : 200,
        msg : ""
    };

    let user = userMap.get(id);

    if (!user) {
        result.code = 404;
        result.msg = "해당 유저는 존재하지 않습니다."
    } else {
        userMap.delete(id);
        result.msg = `${user.name}님, 탈퇴 되었습니다!`;
    }

    res.status(result.code).json({
        message : result.msg
    });
});


// 가입
router.use(express.json());
router.post("/join", (req, res) => {
    let { userId, name, password } = req.body;
    
    let result = {
        code : 201,
        msg : ""
    };

    if (!userId || !name || !password) {
        result.code = 400;
        result.msg = "다시 입력해주세요!"
    } else {
        let isDuplicate = false;

        userMap.forEach((user)=>{
            if (user.userId === userId){
                isDuplicate = true;
            }
        });

        if (isDuplicate){
            result.code = 400;
            result.msg = "이미 가입된 ID입니다!"
        } else {
            userMap.set(userMap.size + 1 ,{userId, name, password});
            result.msg = `${name}님, 가입을 환영합니다!`;
        }
    }

    res.status(result.code).json({
        message : result.msg
    })
});

// 로그인
router.post("/login", (req, res) => {
    let { userId, password } = req.body;

    let result = {
        code : 200,
        msg : ""
    };

    if (!userId || !password) {
        result.code = 400;
        result.msg = "다시 입력해주세요!";
    } else {
        let user = {};
        
        userMap.forEach((usr)=>{
            if (usr.userId === userId){
                user = usr;
            }
        });

        if (!Object.keys(user).length) {
            result.code = 404;
            result.msg = "존재하지 않는 유저입니다.";
        } else {
            if (user.password!==password){
                result.code = 400;
                result.msg = "비밀번호가 틀렸습니다.";
            } else {
                result.msg = `${user.name}님, 로그인 되었습니다!`;
            }
        }
    }

    res.status(result.code).json({
        message : result.msg
    });
});

module.exports = router;