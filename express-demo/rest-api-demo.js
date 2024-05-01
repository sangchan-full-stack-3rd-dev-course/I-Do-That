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
    let statusInfo = {
        statusCode : 200,
        errorMessage : ""
    };

    if (bookStore.size) {
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
        });
    } else {
        statusInfo.statusCode = 404;
        statusInfo.errorMessage = "책이 존재하지 않습니다."
    }


    res.status(statusInfo.statusCode).json({
        error : statusInfo.errorMessage,
        books : books
    });
});

// 책 개별 조회
app.get('/books/:id', (req, res) => {
    let {id} = req.params;
    id = parseInt(id)

    let errorMessage = "";
    let book = bookStore.get(id);
    
    if (book === undefined) {
        errorMessage = "해당 도서는 검열되었습니다."
    } else {
        book.id = id;
    }

    res.json({
        error : errorMessage,
        book : book
    });
});

// 책 추가하기
app.use(express.json());
app.post("/books", (req, res) => {
    let newBook = req.body;
    let id = bookStore.size + 1;
    
    let statusInfo = {
        statusCode : 200,
        message : ""
    };

    if (newBook.title){
        // 책 추가
        bookStore.set(id, newBook);
        statusInfo.message = `${bookStore.get(id).title}이 정상적으로 등록되었습니다!`;
    } else {
        statusInfo.message = "책 제목을 입력해 주세요!";
        statusInfo.statusCode = 400;
    }

    res.status(statusInfo.statusCode).json({
        massage : statusInfo.message
    });
});

// 책 삭제하기
app.delete("/books/:id", (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    let book = bookStore.get(id);

    if (book === undefined) {
        res.json({
            error : "해당 도서는 이미 검열되었습니다."
        });
    } else {
        bookStore.delete(id);
        res.json({
            success : `[${book.title}] 이(가) 성공적으로 검열되었습니다.`
        });
    }
});

// 책 전체 삭제
app.delete("/books", (req, res) => {
    let message = "";

    if (bookStore.size >= 1){
        bookStore.clear();
        message = "모든 도서가 성공적으로 검열되었습니다.";
    } else {
        message = "이미 모든 도서가 검열 된 상태입니다.";
    }

    res.json({
        message : message
    });

});

app.put("/books/:id", (req, res) => {
    let {id} = req.params;
    id = parseInt(id)

    let errorMessage = "";
    let successMessage = "";
    let book = bookStore.get(id);
    
    if (book === undefined) {
        errorMessage = "해당 도서는 검열되었습니다."
    } else {
        book.title = req.body.title

        bookStore.set(id, book);

        successMessage = `${book.title}이(가) 정상적으로 수정되었습니다!`;
    }

    res.json({
        error : errorMessage,
        success : successMessage,
        book : book
    });
});

app.listen(1997);