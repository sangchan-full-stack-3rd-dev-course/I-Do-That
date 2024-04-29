const express = require('express');
const app = express();

let book1 = {
    title : "천마 검법 1권",
    price : 200000,
    publisher : "마교",
    description : "갓난 아기도 할 뚜 이따! 천마 검법!"
}

let book2 = {
    title : "부자 되는 법",
    price : 15000,
    publisher : "일론 머스크",
    description : "그가 트위터를 매수하고 화성에 갈 수 있었던 이유..!"
}

let book3 = {
    title : "하루만에 천만 유튜버 되기",
    price : 0,
    publisher : "이재용",
    description : "직원들보고 구독하라고 하면 됨 ㅋㅋ"
}

let bookStore = new Map();

bookStore.set(1, book1);
bookStore.set(2, book2);
bookStore.set(3, book3);

// 책 리스트 전체 조회
app.get('/books', (req, res) => {
    let books = new Array();

    bookStore.forEach((key, value)=>{
        books.push(
            {
                id : key,
                title : value.title,
                price : value.price,
                publisher : value.publisher,
                description : value.description
            }
        );
    })

    res.json({
        books : books
    });
});

// 책 개별 조회
app.get('/books/:id', (req, res) => {
    let {id} = req.params;

    id = parseInt(id)
    
    if (!bookStore.has(id)) {
        res.json({
            error : "해당 도서는 검열되었습니다."
        });
    } else {
        // bookStore에 존재하지 않는 id(key) 값일 때
        // Cannot set properties of undefined 에러가 발생하여 if-else로 구분함
        let book = bookStore.get(id);

        book.id = id;

        res.json(book);
    }

});

app.listen(1997);