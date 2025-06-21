fetch("/userinfo")
  .then((response) => response.json()) // response는 매개변수
  .then((data) => {
    console.log(JSON.parse(JSON.stringify(data)), "dfafdadfad");

    let base_data;
    // 기존 데이터를 localStorage에서 가져옵니다. 없으면 빈 배열
    base_data = JSON.parse(localStorage.getItem("data")) || [];

    // 데이터가 user
    const same_data = base_data.filter((item) => item.username === data.user);

    // 테이블 업데이트
    const tbody_table = document.querySelector(".tbody_table");
    tbody_table.innerHTML = same_data
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
