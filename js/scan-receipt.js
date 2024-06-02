document.addEventListener('DOMContentLoaded', function() {
    var correctionText = document.getElementById('correction');
    var shareText = document.getElementById('share-box');
    var saveText = document.getElementById('save-box');
    var sum = document.getElementById('sum');
    var prices = document.getElementsByClassName('list-price');
    var titleText = document.getElementById('logo-title');
    var listItems = document.querySelectorAll('.list');
    var listHeaderDiv = document.querySelector('#list-header div');

    // list 삭제
    function addDeleteButtons() {
        listItems.forEach(function(item) {
            var deleteButton = document.createElement('img');
            deleteButton.src = '../../img/delete.png';
            deleteButton.alt = '삭제';
            deleteButton.style.width = '10px';
            deleteButton.style.height = '10px';
            deleteButton.style.cursor = 'pointer';
            deleteButton.style.marginLeft = '12px';
            deleteButton.classList.add('delete-button');
            item.appendChild(deleteButton);

            deleteButton.addEventListener('click', function() {
                item.remove();
                calculateSum();
            });
        });
    }

    function removeDeleteButtons() {
        var deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(function(button) {
            button.remove();
        });
    }

    // 완료 > 수정, 수정 > 완료
    correctionText.addEventListener('click', function() {
        if (correctionText.textContent === '수정') {
            correctionText.textContent = '완료';
            titleText.textContent = '수정';
            listItems.forEach(function(item) {
                item.style.padding = '12px';
                item.style.borderRadius = '8px';
                item.style.border = '1px solid #F0F2F6';
            });
            listHeaderDiv.style.columnGap = '65px';
            addDeleteButtons();
        } else {
            correctionText.textContent = '수정';
            titleText.textContent = '영수증';
            listItems.forEach(function(item) {
                item.style.border = 'none';
                item.style.borderRadius = '0';
                item.style.padding = '0';
            });
            listHeaderDiv.style.columnGap = '40px';
            removeDeleteButtons();
        }
    });

    // 나누기 > 취소 / 저장하기 > 다음
    shareText.addEventListener('click', function() {
        if (shareText.textContent === '나누기') {
            shareText.textContent = '취소';
            saveText.textContent = '다음';
        } else {
            shareText.textContent = '나누기';
            saveText.textContent = '저장하기';
        }
    });

    saveText.addEventListener('click', function() {
        if (saveText.textContent === '다음') {
            saveText.textContent = '선택';
        }
    });

    // 합계 구하기
    function calculateSum() {
        var total = 0;
        for (var i = 0; i < prices.length; i++) {
            total += parseFloat(prices[i].textContent);
        }
        sum.textContent = total;
    }
    calculateSum();
});