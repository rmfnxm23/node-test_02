const express = require("express");
const path = require("path");

// multer
const multer = require("multer");
// 세부설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // 원본 파일명에서 확장자 추출
    const ext = path.extname(File.origialname);
    // 파일명에 타이스탬프와 확장자를 포함시켜서 저장함
    cb(null, Date.now() + ext); //timestamp + 확장자
  },
});
// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });

const app = express();
const port = 3000;

// body-parser
// x-www-form-urlencoded 방식, 객체 형태로 결과가 나옴
app.use(express.urlencoded({ extended: true }));
// json
app.use(express.json());

// JS CSS 연결하기 위해
// static 이라는 정적인 폴더를 생성하여 사용 (괄호안에 파일명)
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));

app.set("view engine", "ejs");
app.set("views", "./views");

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// // URL 경로와 그에 따라 렌더링되는 템플릿
// app.get("/test", (req, res) => {
//   res.render("test");
// });
// app.get("/test2", (req, res) => {
//   res.render("test2");
// });

// // form 전송 실습>>>>>
// app.get("/", (req, res) => {
//   res.render("main");
// });

// // req : request 요청  // res : response 응답
// app.get("/getForm", (req, res) => {
//   // get 요청은 무조건 req.query
//   console.log(req.query, "요청 왔니?");
//   res.render("result", { title: "GET 요청결과", userinfo: req.query });
// });

// app.post("/postForm", (req, res) => {
//   // post 요청은 req.body
//   console.log(req.body, "요청 왔니?");
//   res.render("result", { title: "POST 요청결과", userinfo: req.body });
// });
// // form 전송 실습>>>>>

// // form 활용하여 유저 추가 하기>>>
// // 전역변수
// let data = "";

// app.get("/", (req, res) => {
//   res.render("main");
// });

// // 회원정보 보기
// app.get("/getForm", (req, res) => {
//   data = req.query;
//   console.log(data, "요청 왔니?");
//   res.render("search");
// });

// // 회원정보 등록
// app.post("/postForm", (req, res) => {
//   data = req.body;
//   console.log(req.body, "요청 왔니?");
//   res.render("userlist");
// });

// app.get("/userinfo", (req, res) => {
//   res.json(data);
// });
// // form 활용하여 유저 추가 하기>>>

// url 페이지 이동 연습>>>>>
// app.get("/", (req, res) => {
//   res.render("page_main");
// });
// app.get("/page1", (req, res) => {
//   console.log("요청 왔어");
//   // res.render("page");
//   // window.location.href = "/page";
// });

//localhost3000뒤에 오는 애를 지정
// app.get("/adwwasga6", (req, res) => {
//   console.log("요청 왔어");
//   res.render("adwwasga6", { title: "page1입니다." });
// });
// app.get("/ajjhhjas5555", (req, res) => {
//   console.log("요청 왔어");
//   res.render("ajjhhjas5555", { title: "page2입니다." });
// });
// app.get("/akdwdk1", (req, res) => {
//   console.log("요청 왔어");
//   res.render("akdwdk1", { title: "page3입니다." });
// });
// app.get("/asd2", (req, res) => {
//   console.log("요청 왔어");
//   res.render("asd2", { title: "page4입니다." });
// });
// app.get("/asfmaskf125", (req, res) => {
//   console.log("요청 왔어");
//   res.render("asfmaskf125", { title: "page5입니다." });
// });
// url 페이지 이동 연습>>>>>

// // axios 전송 테스트>>>>>
// app.get("/", (req, res) => {
//   res.render("axios");
// });
// app.get("/axiosget", (req, res) => {
//   console.log(req.query, "abc");
//   res.send({ title: "왔다!" });
// });
// app.post("/axiospost", (req, res) => {
//   console.log(req.body, "abc");
//   res.send({ title: "왔다!" });
// });
// // axios 전송 테스트>>>>>

// axios 실습>>>>>
app.get("/", (req, res) => {
  // res.render("practice_axios_post_login");
  res.render("practice_axios_get_join");
});
// 실습1. axios get 회원가입
app.get("/axiosget", (req, res) => {
  console.log(req.query, "abc");
  res.send({ title: "회원가입되셨습니다." });
});

// 회원가입에서 로그인으로 연결
app.get("/login", (req, res) => {
  res.render("practice_axios_post_login");
});

// 보안적인 이유로 서버는 비교 작업만 수행한 후 로그인 성공 여부를 응답으로 클라이언트에 반환합니다.

// 하드코딩된 로그인 정보
const ser_id = "가나다";
const ser_pw = "123";

// 로그인 요청 처리
app.post("/axiospost", (req, res) => {
  const { id, pw } = req.body; // 클라이언트로부터 받은 로그인 데이터

  // 로그인 정보 비교
  if (id === ser_id && pw === ser_pw) {
    res.send({ success: true, message: "로그인 성공!" });
  } else {
    res.send({
      success: false,
      message: "아이디나 비밀번호가 잘못되었습니다.",
    });
  }
});
// axios 실습>>>>>

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
