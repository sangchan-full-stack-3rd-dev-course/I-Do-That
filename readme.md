# 일자 : 24.04.29

## 1. 오늘 내용

### (1) postman의 사용법

-  postman 설치
- GET, POST 요청 보내는 법
- POST 요청 시, body에 데이터 담는 법

### (2) REST API 만들기
- youtuber 객체
    - 전체 조회
    - 개별 조회
    - 추가

## 2. 복습

### REST API 만들기
- book 객체
    - 전체 조회
        - 기존과 차이점
            - map을 순회하여 각 객체마다 id를 추가
            - 이후 Array에 객체들을 담아서 response로 전송
    - 개별 조회
        - 문제점
            - 기존의 로직은 book map에 존재하지 않는 key 값으로 get 함수를 사용할 경우에
            - book 객체에 id를 추가하는 로직에서 Cannot set properties of undefined 에러가 발생함.
        - 해결 과정
            - book 객체가 undefined일 때 response로 에러 메세지를 전송하고 함수가 끝나는 줄 알았음.
            - 그런데 함수가 끝나지 않아 book.id = id 에서 에러가 발생한 것으로 보임.
            - 따라서 if-else문으로 book 객체가 존재할 때만 book.id를 추가하도록 수정함.
    - 객체 추가
        - 기존과 큰 차이 없음