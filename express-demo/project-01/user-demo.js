const express = require('express');
const app = express();

let userMap = new Map();

// 개별 조회
app.get("/users/:id", (req, res) => {
    let {id} = req.params;

    let statusInfo = {
        code : 200,
        msg : ""
    };

    let user = userMap.get(id);

    if (!user) {
        statusInfo.code = 404;
        statusInfo.msg = "해당 유저는 존재하지 않습니다."
    } else {
        user.id = id;
    }

    res.status(statusInfo.code).json({
        message : statusInfo.msg,
        user : user
    });
});


// 가입
app.use(express.json());
app.post("/join", (req, res) => {
    let { id, name, password } = req.body;
    
    let statusInfo = {
        code : 201,
        msg : ""
    };

    if (!id || !name || !password) {
        statusInfo.code = 400;
        statusInfo.msg = "다시 입력해주세요!"
    } else {
        if (userMap.has(id)){
            statusInfo.code = 400;
            statusInfo.msg = "이미 같은 유저가 있습니다!"
        } else {
            userMap.set(id,{name, password});
            statusInfo.msg = `${name}님, 가입을 환영합니다!`;
        }
    }

    res.status(statusInfo.code).json({
        message : statusInfo.msg
    })
});

// 로그인
app.post("/login", (req, res) => {
    let { id, password } = req.body;

    let statusInfo = {
        code : 200,
        msg : ""
    };

    if (!id || !password) {
        statusInfo.code = 400;
        statusInfo.msg = "다시 입력해주세요!";
    } else {
        let user = userMap.get(id);

        if (!user) {
            statusInfo.code = 404;
            statusInfo.msg = "존재하지 않는 유저입니다.";
        } else {
            if (user.password!==password){
                statusInfo.code = 400;
                statusInfo.msg = "비밀번호가 틀렸습니다.";
            } else {
                statusInfo.msg = `${user.name}님, 로그인 되었습니다!`;
            }
        }
    }

    res.status(statusInfo.code).json({
        message : statusInfo.msg
    });
});

// 탈퇴
app.delete("/users/:id", (req, res)=>{
    let {id} = req.params;

    let statusInfo = {
        code : 200,
        msg : ""
    };

    let user = userMap.get(id);

    if (!user) {
        statusInfo.code = 404;
        statusInfo.msg = "해당 유저는 존재하지 않습니다."
    } else {
        userMap.delete(id);
        statusInfo.msg = `${user.name}님, 탈퇴 되었습니다!`;
    }

    res.status(statusInfo.code).json({
        message : statusInfo.msg
    });
});

app.listen(1990);