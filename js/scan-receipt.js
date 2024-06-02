document.addEventListener('DOMContentLoaded', function() {
    var correctionText = document.getElementById('correction');
    var shareText = document.getElementById('share-box');
    var saveText = document.getElementById('save-box');
    var sum = document.getElementById('sum');
    var prices = document.getElementsByClassName('list-price');

    // 완료 > 수정, 수정 > 완료
    correctionText.addEventListener('click', function() {
        if (correctionText.textContent === '수정') {
            correctionText.textContent = '완료';
        } else {
            correctionText.textContent = '수정';
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