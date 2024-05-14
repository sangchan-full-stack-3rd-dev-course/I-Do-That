const express = require('express');
const Result = require('../utils/result');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const conn = require('../db/connection');
const validate = require('../utils/validate');
let jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

router.route("/:id")
.get((req, res) => {
    // 개별 조회
    let {id} = req.params;
    id = parseInt(id);

    let result = new Result();

    let sql = `SELECT * FROM users WHERE id = ?`;
    let data = [id];
    let func = (err, results, fields)=>{
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
    }

    conn.query(sql, data, func);
})
.delete((req, res)=>{
    // 사용자 삭제
    let {id} = req.params;
    id = parseInt(id);

    let result = new Result();

    let sql = `DELETE FROM users WHERE id = ?`;
    let data = [id];
    let func = (err, results, fields)=>{
        if (err) {
            result.serverError("DB Error :" + err.message);
        } else if (!results.affectedRows) {
            result.notFound("해당 유저는 존재하지 않습니다.");
        } else {
            result.success(200, "유저 삭제 성공");
        }
        
        res.status(result.code).json({
            message : result.msg
        });
    }
    
    conn.query(sql, data, func);
});

router.route("/join")
.post( 
    [
        body('email').isEmail().withMessage("이메일 형식이 아닙니다."),
        body('name').notEmpty().withMessage("이름을 입력해주세요."),
        body('password').notEmpty().withMessage("비밀번호를 입력해주세요."),
        body('birthday').notEmpty().withMessage("생년월일을 입력해주세요."),
        body('phone').notEmpty().withMessage("전화번호를 입력해주세요."),
        validate
    ]
    ,(req, res, next) => {
        // 가입
        let { email, name, password, birthday, phone } = req.body;

        let result = new Result();
        
        let sql = `INSERT INTO users (email, name, psword, birthday, phone) VALUES (?,?,?,?,?)`;
        let data = [email, name, password, birthday, phone];
        let func = (err, results, fields)=>{
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
        }

        conn.query(sql, data, func);
});

router.route("/login")
.post(
    [
       body('email').isEmail().withMessage("이메일 형식이 아닙니다."),
       body('password').notEmpty().withMessage("비밀번호를 입력해주세요."),
       validate
    ],(req, res, next) => {
    // 로그인
    let { email, password } = req.body;

    let result = new Result();

    let sql = `SELECT * FROM users WHERE email = ? AND psword = ?`;
    let data = [email, password];
    let func = (err, results, fields) => {
        if (err) {
            result.serverError("DB Error :" + err.message);
        } else if (!results.length) {
            result.notFound("이메일 또는 비밀번호가 틀렸습니다.");
        } else {
            let loginUser = results[0];

            let payload = {
                id : loginUser.id,
                email : loginUser.email,
                name : loginUser.name
            };

            let token = jwt.sign(payload, process.env.SECRET_KEY);

            console.log(token);
            // 쿠키에 token 저장해주기
            // res.cookie()

            result.success(200, `${results[0].name}님, 로그인 되었습니다!`);
        }

        res.status(result.code).json({
            message : result.msg,
        });
    }
    conn.query(sql, data, func);
});

module.exports = router;