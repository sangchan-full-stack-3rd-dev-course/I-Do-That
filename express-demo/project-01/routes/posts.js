const express = require('express');
const Result = require('../result/result');
const router = express.Router();
router.use(express.json());

const conn = require('../db/connection');

router.route("/:id")
.get((req, res) => {
    // 게시글 개별 조회
    let {id} = req.params;
    id = parseInt(id);

    let result = new Result();

    conn.query(`SELECT * FROM posts WHERE id = ?`, id, (err, results, fields)=>{
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
    });
}).delete((req, res)=>{
    // 게시글 삭제
    let {id} = req.params;
    id = parseInt(id);

    let result = new Result();

    let sql = 'DELETE FROM posts WHERE id = ?';
    let data = [id];
    conn.query(sql,data,(err, results, fields)=>{
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
    });
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
        conn.query(sql,data,(err, results, fields)=>{
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
        });
    }
});

router.route("/")
.get((req, res) => {
    // 특정 사용자의 전체 게시글 조회
    let {userId} = req.body;

    let result = new Result();

    let sql = 'SELECT * FROM posts WHERE user_id = ?';
    let data = [userId];
    conn.query(sql,data,(err, results, fields)=>{
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
    });
}).post((req, res) => {
    // 게시글 생성
    let { title, content, userId } = req.body;

    let result = new Result();

    if (!title || !content || !userId) {
        result.badRequest("다시 입력해주세요!");
        res.status(result.code).json({
            message : result.msg
        });
    } else {
        let post = [title, content, userId];
        let sql = `INSERT INTO posts(title,content,user_id) VALUES(?,?,?)`;
        conn.query(sql,post,(err, results, fields)=>{
            if (err) {
                result.serverError("DB Error :" + err.message);
            } else {
                result.success(201, `[${title}] 게시글이 성공적으로 생성되었습니다!`);
            }
            res.status(result.code).json({
                message : result.msg
            });
        });
    }
});

module.exports = router;