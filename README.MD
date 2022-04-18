# 블로그 BE 만들기  

    - Express, JWT, Sequelize, mysql, joi, docker, postman 

## 요구조건
<aside>
✅ API 서버 요구 사항

</aside>

1. 회원 가입 페이지
    - 닉네임은 `최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)`로 구성하기
    - 비밀번호는 `최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패`로 만들기
    - 비밀번호 확인은 비밀번호와 정확하게 일치하기
    
2. 로그인 페이지
    - 로그인 버튼을 누른 경우 닉네임과 비밀번호가 데이터베이스에 등록됐는지 확인한 뒤, 하나라도 맞지 않는 정보가 있다면 "닉네임 또는 패스워드를 확인해주세요"라는 메세지를 프론트엔드에서 띄워줄 수 있도록 예외처리 하기
    
3. 로그인 검사
    - 로그인 하지 않은 사용자도, 게시글 목록 조회는 가능하도록 하기
    - 로그인하지 않은 사용자가 좋아요 버튼을 눌렀을 경우, "로그인이 필요합니다." 라는 메세지를 프론트엔드에서 띄워줄 수 있도록 예외처리 하기
    - 로그인 한 사용자가 로그인 페이지 또는 회원가입 페이지에 접속한 경우 "이미 로그인이 되어있습니다."라는 메세지로 예외처리하기
    - 로그인을 한 사용자만 글쓰기 권한이 존재함
    
4. 예외 처리상황과 Http Method에 맞는 Http Status Code 반환하기
    - 본인이 선택한 Status Code의 반환 이유를 설명하기
    - 회원 가입 페이지, 로그인 페이지, 로그인 검사 기능
    
5. CORS 해결하기
    - CORS란 무엇이며, 어떤 상황에서 일어나는지 / 어떻게 해결하는지 알아보고, 프로젝트에 적용하기
    
6. 관리자 권한
    - 권한을 추가하여 관리자 계정 로그인 시 모든 게시글, 댓글을 삭제할 수 있도록 구현하기

## 작업한 내용

    - [x] JWT인증 방식 연습 완료
    - [x] DB Models 작업 완료
    - [x] 첫째주 express를 이용한 router 이용 방법 완료

## 작업 할 내용

    - [ ] Sequelize 테이블 관계에 대해서 더 알아야함
    - [ ] 로그인 Authentication middleware 처리
    - [ ] refactoring 을 해서 좀서 알아보기 쉽게 가독성을 높혀야함
    - [ ] Joi를 이용한 Validate 작성 

## 모르는 부분

    - Primary key, Forigner key 설정 방법
    - sequelize 구조에 대한 이해 부족

## 새롭게 알게된 부분

    - require 부분도 정리할 수 있다. ( 원영님 소스코드 참조)
    -  Joi 사용법
    -  express.json() 을 미들웨어로 넣어야지 postman에서 application/json타입으로 받을때 정상적으로 받아진다
    - join이 완료되어 있는 상태에서 user -< post 테이블 관계에서 user에 DB가 없으면 에러 발생 서버가 죽는다. 예외처리를 해야함 


## 폴더 구조

    ```
    -    
    - models
    - config
    README.MD
    ```


## HTTP 상태 코드

- 1xx (정보): 요청을 받았으며 프로세스를 계속한다
    - 100	continue
    - 101	Switching
    - 102	Processing
    - 103	Early Hints
    - 104-199	Unassigned	
- 2xx (성공): 요청을 성공적으로 받았으며 인식했고 수용하였다
    - 200	OK
    - 201	Created
    - 202	Accepted
    - 203	Non-Authoritative Information
    - 204	No Content
    - 205	Reset Content
    - 206	Partial Content
    - 207	Multi-Status
    - 208	Already Reported
    - 209-225	Unassigned
    - 226	IM Used
    - 227-299	Unassigned

- 3xx (리다이렉션): 요청 완료를 위해 추가 작업 조치가 필요하다
    - 300	Multiple Choices
    - 301	Moved Permanently
    - 302	Found
    - 303	See Other
    - 304	Not Modified
    - 305	Use Proxy
    - 306	(Unused)
    - 307	Temporary Redirect
    - 308	Permanent Redirect
    - 309-399	Unassigned	

- 4xx (클라이언트 오류): 요청의 문법이 잘못되었거나 요청을 처리할 수 없다
    - 400	Bad Request
    - 401	Unauthorized
    - 402	Payment Required
    - 403	Forbidden
    - 404	Not Found
    - 405	Method Not Allowed
    - 406	Not Acceptable
    - 407	Proxy Authentication Required
    - 408	Request Timeout
    - 409	Conflict
    - 410	Gone
    - 411	Length Required
    - 412	Precondition Failed
    - 413	Content Too Large
    - 414	URI Too Long
    - 415	Unsupported Media Type
    - 416	Range Not Satisfiable
    - 417	Expectation Failed
    - 418	(Unused)
    - 419-420	Unassigned	
    - 421	Misdirected Request
    - 422	Unprocessable Content
    - 423	Locked
    - 424	Failed Dependency
    - 425	Too Early
    - 426	Upgrade Required
    - 427	Unassigned	
    - 428	Precondition Required
    - 429	Too Many Requests
    - 430	Unassigned	
    - 431	Request Header Fields Too Large
    - 432-450	Unassigned
    - 451	Unavailable For Legal Reasons
    - 452-499	Unassigned

- 5xx (서버 오류): 서버가 명백히 유효한 요청에 대해 충족을 실패했다
    -  500	Internal Server Error
    -  501	Not Implemented
    -  502	Bad Gateway
    -  503	Service Unavailable
    -  504	Gateway Timeout
    -  505	HTTP Version Not Supported
    -  506	Variant Also Negotiates
    -  507	Insufficient Storage
    -  508	Loop Detected
    -  509	Unassigned	
    -  510	Not Extended (OBSOLETED)
    -  511	Network Authentication Required
    -  512-599	Unassigned
