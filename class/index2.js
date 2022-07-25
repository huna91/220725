/*
*** npm 설치 ***
 - npm init -y : 메타데이터 파일을 가지고 있는 json 초기화 명령어(y는 yes의 줄임말)
 - 메타데이터는 데이터들을 설명해주는 데이터(속성)

{
  //ㅜ 패키지(프로젝트)의 이름
  "name": "220718",
  //ㅜ 프로젝트의 버전
  "version": "1.0.0",
  //ㅜ 패키지(프로젝트)의 설명 문자열로 작성 가능
  "description": "",
  //ㅜ 메인파일
  "main": "index.js",

  //ㅜ 실행 명령어 => 프로젝트에서 자조 실행해야 하는 명령어를 scripts로 작성해두면 npm 명령어로 편하게 실행 가능
  //ex) "scripts" : {"start":"node index.js","test":"node index2.js"}
  //이렇게 작성하고 실행은 npm start
  //start 상태가 아니면 실행 명령어는 run을 붙여서 npm run test
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },

  "repository": {
    "type": "git",
    "url": "git+https://github.com/huna91/220718.git"
  },
  //ㅜ 프로젝트 작업자 정보
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/huna91/220718/issues"
  },
  "homepage": "https://github.com/huna91/220718#readme"
}





*/

const candyMachine = {
  status: {
    name: "node",
    count: 5,
  },
  getCandy() {
    this.status.count;
    return this.status.count;
  },
};

let { a, b } = candyMachine;
console.log(a);
console.log(b);

const dd = {
  di: 2,
  gk: 3,
};
let { di, gk } = dd;
console.log(di);
console.log(gk);
