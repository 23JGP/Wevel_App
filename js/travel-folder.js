document.addEventListener("DOMContentLoaded", function () {
  let lastSelectedNation = null;
  let nameInput = document.getElementById("name-input");
  const nationImgs = document.querySelectorAll(".nation-img");
  const dateInputs = document.querySelectorAll(".date");
  const overlay = document.createElement('div');
  const dateElements = document.querySelectorAll('.date');
  const datePicker = document.createElement('div');
  const dateBorder = document.createElement('hr');
  const dateButton = document.createElement('div');

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

  // date-picker 구현
  overlay.className = 'overlay';
  datePicker.className = 'date-picker';
  dateBorder.className = 'hr';
  dateButton.classList = 'date-button';
  dateButton.textContent = '선택하기';
  
  dateElements.forEach(function(dateElement) {
    dateElement.addEventListener('click', function() {
      overlay.style.display = 'block';
      datePicker.style.display = 'block';
    });
  });
  
  document.body.appendChild(overlay);
  document.body.appendChild(datePicker);

  dateButton.addEventListener('click', function() {
    overlay.style.display = 'none';
    datePicker.style.display = 'none';
  });

  function createDatePickerCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const datePicker = document.querySelector('.date-picker');
    let selectedDate = null;
    let selectingStartDate = true;

    const setCalendar = (year, month) => {
      datePicker.innerHTML = ''; 
      
      const dateTitle = document.createElement('p');
      dateTitle.className = 'date-title';
      dateTitle.textContent = '출발하는 날';
      dateTitle.style.textAlign = 'center';
      dateTitle.style.margin = '32px 0 20px 0';
      datePicker.appendChild(dateTitle);

      const navigation = document.createElement('div');
      navigation.className = 'calendar-navigation';
      navigation.style.display = 'flex';
      navigation.style.fontSize = '14px';
      navigation.style.columnGap = '14px';
      navigation.style.fontWeight = 'bold';
      navigation.style.alignItems = 'center';
      navigation.style.justifyContent = 'center';
      navigation.style.fontFamily = 'NanumSquareRound';
      datePicker.appendChild(navigation);
      datePicker.appendChild(dateBorder);

      const prevButton = document.createElement('button');
      prevButton.textContent = '<';
      prevButton.style.color = '#2C2C2C';
      prevButton.onclick = () => {
        if (month === 0) {
          month = 11;
          year -= 1;
        } else {
          month -= 1;
        }
        setCalendar(year, month);
      };
      navigation.appendChild(prevButton);

      const title = document.createElement('div');
      title.className = 'calendar-title';
      title.style.fontSize = '14px';
      title.textContent = `${year}. ${String(month + 1).padStart(2, '0')}`;
      navigation.appendChild(title);

      const nextButton = document.createElement('button');
      nextButton.textContent = '>';
      nextButton.style.color = '#2C2C2C';
      nextButton.onclick = () => {
        if (month === 11) {
          month = 0;
          year += 1;
        } else {
          month += 1;
        }
        setCalendar(year, month);
      };
      navigation.appendChild(nextButton);

      const days = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'];
      const daysRow = document.createElement('div');
      daysRow.className = 'calendar-days-row';
      days.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day-header';
        dayElement.textContent = day;
        daysRow.appendChild(dayElement);
      });
      datePicker.appendChild(daysRow);

      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();

      const datesGrid = document.createElement('div');
      datesGrid.className = 'calendar-dates-grid';

      for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-date empty';
        datesGrid.appendChild(emptyCell);
      }

      for (let date = 1; date <= lastDate; date++) {
        const dateCell = document.createElement('div');
        dateCell.className = 'calendar-date';
        dateCell.textContent = date;
        dateCell.onclick = () => {
          if (selectedDate) {
            selectedDate.classList.remove('selected');
          }
          dateCell.style.color = '#ED4B62';
          dateCell.classList.add('selected');
          selectedDate = dateCell;

          if (selectingStartDate) {
            document.getElementById('start-date').textContent = `${year}. ${String(month + 1).padStart(2, '0')}. ${String(date).padStart(2, '0')}`;
            selectingStartDate = false;
          } else {
            document.getElementById('end-date').textContent = `${year}. ${String(month + 1).padStart(2, '0')}. ${String(date).padStart(2, '0')}`;
            selectingStartDate = true;
          }
        };
        datesGrid.appendChild(dateCell);
      }
      datePicker.appendChild(datesGrid);
      datePicker.appendChild(dateButton);
    };

    setCalendar(year, month);

    dateButton.addEventListener('click', function() {
      overlay.style.display = 'none';
      datePicker.style.display = 'none';
      selectingStartDate = true;
    });
  }

  createDatePickerCalendar();

});

// range-bar와 #recent-money 연동 및 천 단위 구분 쉼표
function updateMoneyValue(value) {
  const formattedValue = Number(value).toLocaleString("en-US");
  document.getElementById("recent-money").innerText = formattedValue;
}