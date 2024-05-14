let jwt = require('jsonwebtoken');
let payload = { foo : 'bar'};
let secretKey = 'shhhhhhh';
let token = jwt.sign(payload, secretKey);
// token 생성 - jwt 서명 (페이로드, 나만의 암호키) + SHA256(default)

console.log(token);

// 검증 성공 시 -> 페이로드 확인 가능
var decoded = jwt.verify(token, secretKey);

console.log(decoded);

// iat - issued at (토큰 발행 시간) : 같은 값을 암호화해도 발행 시간에 따라서 토큰값이 바뀜!