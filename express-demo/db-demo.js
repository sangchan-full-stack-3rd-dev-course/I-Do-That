const mysql = require('mysql2');

// .env로 민감한 정보 관리
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PSWORD
});

connection.query(
  'SELECT * FROM users',
  (err, results, fields) => {
    results.forEach((result,index)=>{
      console.log("사용자"+(index+1));
      console.log(result);
    });
  }
);