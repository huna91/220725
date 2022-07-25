/*
 *** express란 ***
 : nodejs를 사용해서 쉽게 서버 구성을 할 수 있도록 만들어주는 클래스와 라이브러리 집합
 
 - express 설치 명령어
 ----------------------------------------------------------------
 npm i express
 ----------------------------------------------------------------
 
 
 
 */

// express를 가져와서 변수에 담아줌
// 모듈 가져온것들
const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

/*
*** ejs란 ***
ejs는 node.js와 express에서 많이 사용하고 있는 템플릿 엔진이다.
ejs는 우리가 쓰는 기존 html문법을 사용하면서 <% %>같은 문법을 
사용하여 기존과 크게 벗어나지 않게 서버와 데이터를 사용할 수 있는 장점이 있다.

ejs 설치 명령어
----------------------------------------------------------------
npm i ejs
----------------------------------------------------------------

*/

// fs는 파일 읽기 쓰기를 쉽게 도와주는 모듈이다.
// fs 설치 명령어
//----------------------------------------------------------------
// npm i fs
//----------------------------------------------------------------

// mysql 가져오기

const temp = mysql.createConnection({
  user: "root",
  password: "huna91",
  database: "test2",
  // 다중 쿼리문(콜백지옥)을 가독성 좋게 사용하기위해 설정하는 옵션
  // multipleStatements : 다중 쿼리문을 사용 할 수 있도록 하는 옵션(true, false)
  multipleStatements: true,
});

temp.query("SELECT * FROM products", (err, res) => {
  if (err) {
    const sql =
      "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
    temp.query(sql);
    console.log("실패1");
  } else {
    console.log(res);
  }
});

temp.query("SELECT * FROM products2", (err, res) => {
  if (err) {
    const sql =
      "CREATE TABLE products2(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
    temp.query(sql);
    console.log("실패1");
  } else {
    console.log(res);
  }
});

// express 함수를 실행해서 반환 값을 app에 담아준다.
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
  // extended의 옵션
  // true: express에 기본 내장된 쿼리 스트링 모듈을 사용한다.
  // false : 쿼리 스트링 모듈의 기능이 좀 더 확장된 qs 모듈을 사용한다.
);
// 웹서버 포트를 정해 준다.
const PORT = 4000;

// app.get();
// app.post();

// app.get('요청 url')
app.get("/", (req, res) => {
  // console.log(req);
  // http에서는 end함수로 보내고 끝냈지만
  // express에서는 send로 보내고 끝낸다.
  // 파일을 fs 모듈로 읽어온다.
  // fs모듈이 파일을 읽어오는 함수 : readFile
  // 매개변수 첫번째 : 파일의 경로 이름
  // 두번째 : 인코딩 방식
  // 세번째 : 콜백 함수
  fs.readFile("src/list.html", "utf-8", (err, data) => {
    // ejs render 함수로 해당 파일을 불러와 그려준다.
    temp.query("SELECT * FROM products", (err, result) => {
      // ejs 두번째 매개변수로 데이터를 전달 할 수 있다.
      res.send(
        ejs.render(data, {
          data: result,
        })
      );
    });
  });
});
app.get("/insert", (req, res) => {
  fs.readFile("src/insert.html", "utf-8", (err, data) => {
    res.send(data);
  });
});
// 위와같은 상태에서는 get으로 받은것이고 insert페이지에서 post로 내보내니 이를 해결하기 위해
// 아래와 같이 추가한다.

/*
*** body-parser ***
: 요청과 응답사이에서 공통적인 기능을 제공해주는 미들웨어이다.
 데이터를 body 라는 객체 안에 담아서 요청 응답을 받을 수 있게 해준다.

 설치 명령어
----------------------------------------------------------------
 npm i body-parser
----------------------------------------------------------------
*/

app.post("/insert", (req, res) => {
  const data = req.body;
  // body 객체 안에 form에서 보내준 데이터는 input들의 name이 키값
  // 해당 input의 value값으로 전달된다.
  const sql = "INSERT INTO products (name,number,series) VALUES(?,?,?)";

  temp.query(sql, [data.name, data.number, data.series], () => {
    // temp.query("SET @CNT =0;", () => {
    //   temp.query("UPDATE products SET products.id = @CNT:=@CNT+1", () => {
    //     res.redirect("/");
    //   });
    //   // url 경로를 redirect함수의 매개변수 경로로 이동한다.
    // });
    res.redirect("/");
    //   temp.query(sql_delete, data.id);
    console.log(data);
  });
});

// 메모 삭제
// app.get("/delete/:id", (req, res) => {
//   const sql = `DELETE FROM products WHERE id=?`;
//   temp.query(sql, req.params.id, () => {
//     res.redirect("/");
//   });

//   // 2
//   // delete_btn.setAttribute('method','post');
// });

app.get("/delete/:iiiijkkk", (req, res) => {
  // url 요청에서 파라메터를 뽑아낼 수 있다.(req요청의 값을 이용하는 방법)
  // 위의 '/delete/:id'의 의미는 http://localhost:4000/delete/뒤의 값을 가져오려고 하는 것이며
  // params 매서드를 통해 가져온다. :뒤의 id 이것이 params의 키값이다.
  // 받은 결과 : {params:{id:1}}
  const sql = "DELETE FROM products WHERE id=?";
  const sql2 = "SET @CNT = 0;";
  const sql3 = "UPDATE products SET products.id = @CNT:=@CNT+1;";
  const sql4 = "ALTER TABLE products AUTO_INCREMENT =0;";
  console.log(req.params);
  temp.query(sql, [req.params.iiiijkkk], () => {
    // AUTO_INCREMENT이 설정 때문에 id가 자동으로 증가하고 있다.
    // 아래 쿼리문으로 순서를 초기화 하고 다시 넣어주도록 한다.
    // temp.query("SET @CNT = 0;", () => {
    //   temp.query("UPDATE products SET products.id = @CNT:=@CNT+1", () => {
    //     // UPDATE와 ALTER의 차이
    //     // 둘다 수정하는 명령어인데 UPDATE는 데이터 명령어로 데이터베이스의 관계에 저장된 데이터를 수정하는 것.
    //     // ALTER는 데이터의 정의 명령어로 데이터베이스의 관계 구조를 수정하는데 사용된다.
    //     temp.query("ALTER TABLE products AUTO_INCREMENT =0", () => {
    //       res.redirect("/");
    //     });
    //   });
    // });

    // multipleStatements 옵션을 사용하여 아래와 같이 바꿈~!!!!!
    temp.query(sql2 + sql3 + sql4, () => {
      res.redirect("/");
    });
  });
});

// 수정하기
app.get("/edit/:id", (req, res) => {
  fs.readFile("src/edit.html", "utf-8", (err, data) => {
    temp.query(
      "SELECT * FROM products WHERE id =?",
      [req.params.id],
      (_err, result) => {
        res.send(ejs.render(data, { data: result[0] }));
      }
    );
  });
});
// 수정 적용하기
app.post("/edit/:id", (req, res) => {
  const { name, number, series } = req.body;
  const sql = `UPDATE products SET name=?,number=?,series=? WHERE id=?`;
  console.log(name);
  temp.query(sql, [name, number, series, req.params.id], () => {
    res.redirect("/");
  });
});

app.get("/test", (req, res) => {
  const sql = "SELECT * FROM products;";
  const sql2 = "SELECT * FROM products2;";
  temp.query(sql + sql2, (err, result) => {
    console.log(result[0]);
    console.log(result[1]);
  });
});

// app.get("/insert", (req, res) => {});
app.listen(PORT, () => {
  console.log();
});
