const express = require('express');
const Result = require('../result/result');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.use(express.json());

const conn = require('../db/connection');

router.route("/:id")
.get((req, res) => {
    // 게시글 개별 조회
    let {id} = req.params;
    id = parseInt(id);

    let result = new Result();

    let sql = `SELECT * FROM posts WHERE id = ?`;
    let data = [id];
    let func = (err, results, fields)=>{
        if (err) {
            result.serverError("DB Error :" + err.message);
        } else if (!results.length) {
            result.notFound("해당 게시글은 존재하지 않습니다.");
        } else {
            result.success(200, "성공");
        }

        res.status(result.code).json({
            message : result.msg,
            post : results[0]
        });
    }

    conn.query(sql, data, func);
}).delete((req, res)=>{
    // 게시글 삭제
    let {id} = req.params;
    id = parseInt(id);

    let result = new Result();

    let sql = 'DELETE FROM posts WHERE id = ?';
    let data = [id];
    let func = (err, results, fields)=>{
        if (err) {
            result.serverError("DB Error :" + err.message);
        } else if (!results.affectedRows) {
            result.notFound("해당 게시글은 존재하지 않습니다.");
        } else {
            result.success(200, "게시글 삭제 성공");
        }

        res.status(result.code).json({
            message : result.msg
        });
    }
    
    conn.query(sql,data,func);
}).put((req, res)=>{
    // 게시글 수정
    let {id} = req.params;
    let { title, content } = req.body;

    id = parseInt(id);

    let result = new Result();

    if (!title || !content){
        result.badRequest("제대로 입력해주세요!");
        res.status(result.code).json({
            message : result.msg
        });
    } else{
        let sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
        let data = [title, content, id];
        let func = (err, results, fields)=>{
            if (err) {
                result.serverError("DB Error :" + err.message);
            } else if (!results.affectedRows) {
                result.notFound("해당 게시글은 존재하지 않습니다.");
            } else {
                result.success(200, "게시글 수정 성공");
            }
    
            res.status(result.code).json({
                message : result.msg
            });
        }
        conn.query(sql,data,func);
    }
});

router.route("/")
.get([
        body('userId').notEmpty().isInt().withMessage('userId 제대로 입력!')
    ],(req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
        res.status(400).json(err.array());
        return;
    }
    // 특정 사용자의 전체 게시글 조회
    let {userId} = req.body;

    let result = new Result();

    let sql = 'SELECT * FROM posts WHERE user_id = ?';
    let data = [userId];
    let func = (err, results, fields)=>{
        if (err) {
            result.serverError("DB Error :" + err.message);
        } else if (!results.length) {
            result.notFound("해당 사용자의 게시글이 존재하지 않습니다.");
        } else {
            result.success(200, "성공");
        }

        res.status(result.code).json({
            message : result.msg,
            posts : results
        });
    }
    conn.query(sql,data,func);
}).post([
            body('title').notEmpty().withMessage("제목을 입력해주세요."),
            body('content').notEmpty().withMessage("내용을 입력해주세요."),
            body('userId').notEmpty().isInt().withMessage('userId 제대로 입력!')
        ],(req, res) => {
            const err = validationResult(req);

            if (!err.isEmpty()) {
                res.status(400).json(err.array());
                return;
            }
            // 게시글 생성
            let { title, content, userId } = req.body;

            let result = new Result();

            let post = [title, content, userId];
            let sql = `INSERT INTO posts(title,content,user_id) VALUES(?,?,?)`;
            let func = (err, results, fields)=>{
                if (err) {
                    result.serverError("DB Error :" + err.message);
                } else {
                    result.success(201, `[${title}] 게시글이 성공적으로 생성되었습니다!`);
                }
                res.status(result.code).json({
                    message : result.msg
                });
            }
            conn.query(sql,post,func);
});

module.exports = router;