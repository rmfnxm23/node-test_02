// fetch("/userinfo")
//   .then((response) => response.json()) //response는 매개변수
//   .then((data) => {
//     //data는 매개변수
//     console.log(JSON.parse(JSON.stringify(data)), "dfafdadfad");
//     let base_data;
//     // 새로운 데이터를 배열에 추가
//     base_data = JSON.parse(localStorage.getItem("data")) || [];
//     if (data !== base_data) {
//       // const update_data = JSON.parse(JSON.stringify(data));
//       base_data.push(data);
//       // 배열을 다시 localStorage에 저장
//       localStorage.setItem("data", JSON.stringify(base_data));

//       const tbody_table = document.querySelector(".tbody_table");
//       tbody_table.innerHTML = base_data
//         .map((x) => {
//           return `
//         <tr>
//           <td>${x.username}</td>
//           <td>${x.email}</td>
//           <td>${x.userage}</td>
//         </tr>
//       `;
//         })
//         .join("");
//     }
//   })
//   .catch((error) => {
//     console.log("error");
//     console.error("에러 발생: ", error);
//     // res.status(500).send("서버 오류가 발생했습니다.");
//   });
fetch("/userinfo")
  .then((response) => response.json()) // response는 매개변수
  .then((data) => {
    console.log(JSON.parse(JSON.stringify(data)), "dfafdadfad");

    let base_data;
    // 기존 데이터를 localStorage에서 가져옵니다. 없으면 빈 배열
    base_data = JSON.parse(localStorage.getItem("data")) || [];

    // 데이터가 이미 존재하는지 확인
    const same_data = base_data.some((item) => {
      return (
        item.username === data.username &&
        item.email === data.email &&
        item.userage === data.userage
      );
    });
    if (!same_data) {
      // 새 데이터가 없으면 추가
      base_data.push(data);

      // 배열을 다시 localStorage에 저장
      localStorage.setItem("data", JSON.stringify(base_data));
    }

    // 테이블 업데이트
    const tbody_table = document.querySelector(".tbody_table");
    tbody_table.innerHTML = base_data
      .map((x) => {
        return `
        <tr>
          <td>${x.username}</td>
          <td>${x.userage}</td>
          <td>${x.email}</td>
        </tr>
      `;
      })
      .join("");
  })
  .catch((error) => {
    console.log("error");
    console.error("에러 발생: ", error);
  });
