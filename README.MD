# 블로그 BE 만들기  

    - Express, JWT, Sequelize, mysql, joi, docker, postman 

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
