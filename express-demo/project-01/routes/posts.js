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

    let post = postMap.get(id);

    if (!post) {
        result.notFound("존재하지 않는 게시글입니다.");
    } else {
        postMap.delete(id);
        result.success(200, `[${post.title}] 게시글을 삭제 했습니다!`);
    }

    res.status(result.code).json({
        message : result.msg
    });
}).put((req, res)=>{
    // 게시글 수정
    let {id} = req.params;
    let { title, content } = req.body;

    id = parseInt(id);

    let result = new Result();

    let post = postMap.get(id);

    if (!post) {
        result.notFound("게시글이 존재하지 않습니다요!");
    } else {
        if (!title || !content){
            result.badRequest("제대로 입력해주세요!");
        } else {
            post.title = title;
            post.content = content;
            postMap.set(id,post);
            result.success(200, `게시글을 수정 했습니다!`);
        }
    }

    res.status(result.code).json({
        message : result.msg
    });
});

router.route("/")
.get((req, res) => {
    // 특정 사용자의 전체 게시글 조회
    let {userId} = req.body;

    let posts = new Array();

    let result = new Result();

    if (!postMap.size) {
        result.notFound("그냥 게시글이 아무것도 없습니다");
    } else {
        postMap.forEach((value, index)=>{
            if (value.userId === userId){
                posts.push(
                    {
                        id : index,
                        title : value.title,
                        view : value.view,
                        content : value.content,
                        userId : value.userId
                    }
                );
            }
        });

        if (!posts.length){
            result.notFound(`[${userId}]님이 작성한 게시글이 존재하지 않습니다.`);
        }
    }

    res.status(result.code).json({
        message : result.msg,
        posts : posts
    });
}).post((req, res) => {
    // 게시글 생성
    let { title, view, content, userId } = req.body;

    let result = new Result();

    if (!title || !view || !content || !userId) {
        result.badRequest("다시 입력해주세요!");
    } else {
        let post = {
            title : title,
            view : view,
            content : content,
            userId : userId
        };

        postMap.set(postMap.size+1, post)

        result.success(200, `[${title}] 게시글이 성공적으로 생성되었습니다!`);
    }

    res.status(result.code).json({
        message : result.msg
    });
});

module.exports = router;