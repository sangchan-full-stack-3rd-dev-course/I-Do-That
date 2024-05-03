const express = require('express');
const Result = require('../result/result');
const router = express.Router();


router.use(express.json());

// Map 초기 데이터 -----------

let post1 = {
    title : "first BBa",
    view : 1000,
    content : "안녕하세요. 첫번째 게시글입니다.",
    userId : "gkgk00142"
};

let post2 = {
    title : "내가분탕이될께",
    view : 24000,
    content : "뜌따! 뜌따따! 뜌우따! 우따야!",
    userId : "gkgk00143"
};

let post3 = {
    title : "코딩고수가될거야",
    view : 920,
    content : "코딩을 배우고싶어요!",
    userId : "gkgk00142"
}

let postMap = new Map();

postMap.set(1, post1);
postMap.set(2, post2);
postMap.set(3, post3);

// Map 초기 데이터 -----------

router.route("/:id")
.get((req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    let result = new Result();

    let post = postMap.get(id);

    if (!post) {
        result.notFound("해당 게시글을 찾을 수 없습니다.");
    } else {
        post.id = id;
    }

    res.status(result.code).json({
        message : result.msg,
        post : post
    });
}).delete((req, res)=>{
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

// 전체 조회
router.route("/")
.get((req, res) => {
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