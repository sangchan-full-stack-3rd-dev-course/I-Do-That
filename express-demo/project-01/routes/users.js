const express = require('express');
const Result = require('../result/result');
const router = express.Router();

const conn = require('../db/connection');

// 개별 조회
router.route("/:id").
get((req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    let result = new Result();

    conn.query(`SELECT * FROM users WHERE id = ?`, id, (err, results, fields)=>{
        if (err) {
            result.serverError("DB Error :" + err.message);
        } else if (!results.length) {
            result.notFound("해당 유저는 존재하지 않습니다.");
        } else {
            result.success(200, "성공");
        }

        res.status(result.code).json({
            message : result.msg,
            user : results[0]
        });
    });
}).delete((req, res)=>{
    let {id} = req.params;
    id = parseInt(id);

    let result = new Result();

    conn.query(`DELETE FROM users WHERE id = ?`, id,(err, results, fields)=>{
        if (err) {
            result.serverError("DB Error :" + err.message);
        } else if (!results[0].affectedRows == 0) {
            result.notFound("해당 유저는 존재하지 않습니다.");
        } else {
            result.success(200, "유저 삭제 성공");
        }
        
        res.status(result.code).json({
            message : result.msg
        });
    });
});


// 가입
router.use(express.json());
router.post("/join", (req, res) => {
    let { email, name, password, birthday, phone } = req.body;
    
    let result = new Result();

    if (!email || !name || !password || !birthday || !phone) {
        result.badRequest("다시 입력해주세요!");

        res.status(result.code).json({
            message : result.msg
        })
    } else {      
        conn.query(`INSERT INTO users (email, name, psword, birthday, phone) VALUES (?,?,?,?,?)`, [email, name, password, birthday, phone], (err, results, fields)=>{
            if (err) {
                let msg = "";

                if (err.message.includes("Duplicate")){
                    msg = "이미 존재하는 이메일입니다.";
                } else {
                    msg = err.message;
                }

                result.serverError("DB Error :" + msg);
            } else {
                result.success(201, `${name}님, 가입을 환영합니다!`);
            }

            res.status(result.code).json({
                message : result.msg
            });
        });
    }
});

// 로그인
router.post("/login", (req, res) => {
    let { email, password } = req.body;

    let result = new Result();

    if (!email || !password) {
        result.badRequest("다시 입력해주세요!");
    } else {
        let user = {};
        
        userMap.forEach((usr)=>{
            if (usr.email === email){
                user = usr;
            }
        });

        if (!Object.keys(user).length) {
            result.notFound("존재하지 않는 유저입니다.");
        } else {
            if (user.password!==password){
                result.badRequest("비밀번호가 틀렸습니다.");
            } else {
                result.success(200, `${user.name}님, 로그인 되었습니다!`);
            }
        }
    }

    res.status(result.code).json({
        message : result.msg
    });
});

module.exports = router;