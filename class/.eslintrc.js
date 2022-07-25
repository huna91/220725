// 내보내기 exports
module.exports = {
  extends: ["airbnb-base", "prettier", "plugin:node/recommended"],
};

// 미리 좋은 세팅들이 있으니 가져와서 설정한다.
// 에어비엔비 https://github.com/airbnb/javascript

// air bnb 패키지 설치 명령어
//--------------------------------------------------------------------
// npm install --save-dev eslint-config-airbnb-base
// npm install --save-dev eslint-plugin-import
//--------------------------------------------------------------------
// npm 패키지 두개를 다운받는 방법 (뒷부분에 두개 붙이기)
// npm install --save-dev eslint-config-airbnb-base eslint-plugin-import
// --------------------------------------------------------------------
//  --save-dev는 개발환경이다.
//  --save-dev로 받은 패키지는 devDependencies에 작성된다.
// 개발에만 필요하고 실제 구동은 필요 없는 파일들이다.
//--------------------------------------------------------------------
// 설치 후 prettier와 충돌이 일어나 오류가 많이 발생한다.
//  이는 위의 extends에 "prettier"를 추가하고 eslint prettier package를 다운받아 같이 적용해주면 된다.
//  eslint prettier package 다운 명령어
//--------------------------------------------------------------------
// npm install --save-dev eslint-config-prettier
//--------------------------------------------------------------------

// ESlint 규칙을 사용하게 되면

/*
 *** node에 대한 설정 ***
- node 전용 플러그인
- node 전용 플러그인 설치 명령어
--------------------------------------------------------------------
npm install --save-dev eslint-plugin-node
--------------------------------------------------------------------





*/
