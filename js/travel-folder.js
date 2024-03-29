document.addEventListener('DOMContentLoaded', function () {
    let lastSelectedNation = null;
    let nameInput = document.getElementById('name-input');
    let dateInputs = document.querySelectorAll('#date-container input');
    const nationImgs = document.querySelectorAll('.nation-img');
    
    // .nation-img의 마지막 선택자 저장
    nationImgs.forEach(function (nationImg) {
        nationImg.addEventListener('click', function () {
            if (lastSelectedNation) {
                lastSelectedNation.classList.remove('active');
            }
            
            nationImg.classList.add('active');
            
            lastSelectedNation = nationImg;
            
            document.querySelectorAll('.nation-title').forEach(function (title) {
                title.style.color = 'var(--Gray-04, #707174)';
            });

            const nationTitle = nationImg.nextElementSibling;
            nationTitle.style.color = 'var(--Primary-main, #ED4B62)';

            updateFooterStyle();
        });
    });

    nameInput.addEventListener('input', function () {
        updateFooterStyle();
    });

    dateInputs.forEach(function (dateInput) {
        dateInput.addEventListener('input', function () {
            updateFooterStyle();
            updateDateInputStyle(dateInput);
        });
    });

    // 여행 이름, 여행 국가, 기간 모두 다 입력하면 footer 색 변경
    function updateFooterStyle() {
        const isNameInputFilled = nameInput.value.trim() !== '';
        const isNationSelected = lastSelectedNation !== null;
        const isStartDateSelected = dateInputs[0].value !== '';
        const isEndDateSelected = dateInputs[1].value !== '';
        
        const footer = document.querySelector('footer');
        if (isNameInputFilled && isNationSelected && isStartDateSelected && isEndDateSelected) {
            footer.style.backgroundColor = '#ED4B62';
        } else {
            footer.style.backgroundColor = '#F79FAB';
        }
    }

    // date input에 값 지정하면 style 적용
    function updateDateInputStyle(dateInput) {
        const value = dateInput.value;
        if (value.trim() !== '') {
            dateInput.style.color = '#000'; 
            dateInput.style.textAlign = 'center';
            dateInput.style.fontFamily = 'Pretendard';
        } else {
            dateInput.style.color = ''; 
            dateInput.style.textAlign = ''; 
            dateInput.style.fontFamily = '';
        }
    }
});

// range-bar와 #recent-money 연동 및 천 단위 구분 쉼표
function updateMoneyValue(value) {
    const formattedValue = Number(value).toLocaleString('en-US');
    document.getElementById('recent-money').innerText = formattedValue;
}
