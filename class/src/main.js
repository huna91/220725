/*
 *** mySQL 연결 ***
 1. MySQL 설치 -> 설치명령어
 ------------------------------------------------------------------------
 npm i mysql2
 ------------------------------------------------------------------------
 2. mysql과 mysql2의 차이점(mysql2를 설치한 이유)
 - mySQL은 콜백 기반이기 때문에 promise를 사용하지 못한다. 이에 mysql2를 쓴다.
 - mySQL을 보안하려면 promise-mysql을 설치해서 사용해야 한다.
 - mySQL2는 promise를 지원하기 때문에 바로 사용해도 된다.
 3. mysql2 require함수로 모듈을 가져온다.







*/
const mysql = require("mysql2");

// createConnection 옵션
// host : 연결할 호스트를 나타냄
// port : 연결할 포트
// user : 사용자의 이름
// password : 사용자 비밀번호
// database : 연결할 데이터베이스 이름
// debug : 디버그 모드 사용 여부
const temp = mysql.createConnection({
  user: "root",
  password: "huna91",
  database: "test",
});

// query 함수의 첫번째 매개변수는 쿼리문을 입력 두번째 매개변수는 콜백 함수
// 두번째 매개변수 함수의 매개변수는 쿼리 에러, 결과 두개로 받음
temp.query("SELECT * FROM products", (err, res) => {
  if (err) {
    const sql =
      "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
    temp.query(sql);
    console.log("실패");
  } else {
    console.log(res);
  }
});

const http = require("http");

const server = http.createServer((req, res) => {
  req.statusCode = 200;
  /*
  서버에서 한글이 깨지는 경우 인코딩 방식을 정해준다.
  res setHeader(내용) 함수를 사용해서 해더의 정보를 설정 할 수 있다.
  utf-8로 컨텐츠 내용을 인코딩하는 속성을 아래와 같이 추가한다.
  */
  res.setHeader("Content-Type", "application/json", "charset=utf-8");

  // 요청된 url 확인
  // req.url
  // 요청된 method 확인
  // req.method

  // *********************************************************************
  // js의 내용이 수정되었을때 자동으로 모니터링 해서 서버를 재시작 해주는 툴
  // : nodemon => 노드 모니터링
  // nodemon 설치 명령어
  //-------------------------------------------------------------------
  // npm install --save-dev nodemon
  // 터미널 창에서 직접 nodemon을 사용하려면 아래 명령어로 입력한다.
  // npm install -g nodemon
  //-------------------------------------------------------------------
  // 개발환경에서 사용하니 -dev 붙여줌
  // !!!!package.json에서 node를 nodemon으로 변경해줌!!!!
  // *********************************************************************
  const URL = req.url;
  switch (URL) {
    case "/":
      res.end("메인페이지");
      break;
    case "/list":
      temp.query("SELECT * FROM products", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          // data에는 products 테이블의 안의 컬럼 내용
          res.end(JSON.stringify(data));
        }
      });
      break;
    case "/add":
      // (name)(name,number, series) VALUES (?, ?, ?) 이런 형태로 작성하게 되면 벨류의 값을
      // 두번째 배열 타입의 매개변수로 추가할 수 있다.
      // eslint-disable-next-line no-case-declarations
      let aaa = "tnlqkqk";
      const sql2 =
        "INSERT INTO products (name,number, series) VALUES (?, ?, ? )";
      temp.query(sql2, [aaa, "1", "1세대"]);
      break;
    default:
      res.end("주소오류");
      break;
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log("port :", PORT);
});
