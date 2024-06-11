document.addEventListener("DOMContentLoaded", function () {
  let lastSelectedNation = null;
  let nameInput = document.getElementById("name-input");
  const nationImgs = document.querySelectorAll(".nation-img");

  // .nation-img의 마지막 선택자 저장
  nationImgs.forEach(function (nationImg) {
    nationImg.addEventListener("click", function () {
      if (lastSelectedNation) {
        lastSelectedNation.classList.remove("active");
      }

      nationImg.classList.add("active");

      lastSelectedNation = nationImg;

      document.querySelectorAll(".nation-title").forEach(function (title) {
        title.style.color = "var(--Gray-04, #707174)";
      });

      const nationTitle = nationImg.nextElementSibling;
      nationTitle.style.color = "var(--Primary-main, #ED4B62)";

      updateFooterStyle();
    });
  });

  nameInput.addEventListener("input", function () {
    updateFooterStyle();
  });

  // 날짜 입력 필드에 변경 이벤트 리스너 추가
  const dateInputs = document.querySelectorAll(".date");
  dateInputs.forEach(function (input) {
    input.addEventListener("change", function () {
      updateFooterStyle();
    });
  });

  // 여행 이름, 여행 국가, 기간 모두 다 입력하면 footer 색 변경
  function updateFooterStyle() {
    const isNameInputFilled = nameInput.value.trim() !== "";
    const isNationSelected = lastSelectedNation !== null;
    const isStartDateSelected = dateInputs[0].value !== "";
    const isEndDateSelected = dateInputs[1].value !== "";

    const footer = document.querySelector("footer");
    if (
      isNameInputFilled &&
      isNationSelected &&
      isStartDateSelected &&
      isEndDateSelected
    ) {
      footer.style.backgroundColor = "#ED4B62";
    } else {
      footer.style.backgroundColor = "#F79FAB";
    }
  }
});

// range-bar와 #recent-money 연동 및 천 단위 구분 쉼표
function updateMoneyValue(value) {
  const formattedValue = Number(value).toLocaleString("en-US");
  document.getElementById("recent-money").innerText = formattedValue;
}
