document.addEventListener('DOMContentLoaded', function() {
    var correctionText = document.getElementById('correction');
    var shareText = document.getElementById('share-box');
    var saveText = document.getElementById('save-box');
    var sum = document.getElementById('sum');
    var tax = document.getElementById('tax');
    var prices = document.getElementsByClassName('list-price');
    var titleText = document.getElementById('logo-title');
    var listHeaderDiv = document.querySelector('#list-header div');
    var listAddButton = document.querySelector('.list-add');
    var listBody = document.getElementById('list-body');
    var listItems = document.querySelectorAll('.list');

    // 삭제 이미지
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

            var itemName = item.querySelector('.list-name');
            var itemCnt = item.querySelector('.list-cnt');
            var itemPrice = item.querySelector('.list-price');

            var itemNameInput = document.createElement('input');
            itemNameInput.type = 'text';
            itemNameInput.value = itemName.textContent;
            itemNameInput.classList.add('list-name-input');

            var itemCntInput = document.createElement('input');
            itemCntInput.type = 'number';
            itemCntInput.value = itemCnt.textContent;
            itemCntInput.classList.add('list-cnt-input');

            var itemPriceInput = document.createElement('input');
            itemPriceInput.type = 'number';
            itemPriceInput.value = itemPrice.textContent;
            itemPriceInput.classList.add('list-price-input');

            itemName.replaceWith(itemNameInput);
            itemCnt.replaceWith(itemCntInput);
            itemPrice.replaceWith(itemPriceInput);
        });
    }

    // footer toggle 
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
            listAddButton.style.display = 'block';
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
            listAddButton.style.display = 'none';
            removeDeleteButtons();
            calculateSum(); 
        }
    });

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
        var taxValue = parseFloat(tax.textContent);
        for (var i = 0; i < prices.length; i++) {
            total += parseFloat(prices[i].textContent);
        }
        sum.textContent = total + taxValue;
    }
    calculateSum();

    // .list 추가
    listAddButton.addEventListener('click', function() {
        var newItem = document.createElement('div');
        newItem.classList.add('list');

        var itemNameInput = document.createElement('input');
        itemNameInput.type = 'text';
        itemNameInput.value = '상품명을 입력하세요';
        itemNameInput.style.outline = 'none';
        itemNameInput.classList.add('list-name-input');

        var itemCntInput = document.createElement('input');
        itemCntInput.type = 'number';
        itemCntInput.value = '0';
        itemCntInput.style.outline = 'none';
        itemCntInput.classList.add('list-cnt-input');

        var itemPriceInput = document.createElement('input');
        itemPriceInput.type = 'number';
        itemPriceInput.value = '0';
        itemPriceInput.style.outline = 'none';
        itemPriceInput.classList.add('list-price-input');

        newItem.appendChild(itemNameInput);
        newItem.appendChild(itemCntInput);
        newItem.appendChild(itemPriceInput);

        var deleteButton = document.createElement('img');
        deleteButton.src = '../../img/delete.png';
        deleteButton.alt = '삭제';
        deleteButton.style.width = '10px';
        deleteButton.style.height = '10px';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.marginLeft = '12px';
        deleteButton.classList.add('delete-button');
        newItem.appendChild(deleteButton);

        deleteButton.addEventListener('click', function() {
            newItem.remove();
            calculateSum();
        });

        listBody.insertBefore(newItem, listAddButton);

        listItems = document.querySelectorAll('.list');
        if (correctionText.textContent === '완료') {
            addDeleteButtons();
        }

        calculateSum();
    });

    // .list 삭제
    function removeDeleteButtons() {
        var deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(function(button) {
            button.remove();
        });

        listItems.forEach(function(item) {
            var itemNameInput = item.querySelector('.list-name-input');
            var itemCntInput = item.querySelector('.list-cnt-input');
            var itemPriceInput = item.querySelector('.list-price-input');

            var itemName = document.createElement('p');
            itemName.textContent = itemNameInput.value;
            itemName.classList.add('list-name');

            var itemCnt = document.createElement('p');
            itemCnt.textContent = itemCntInput.value;
            itemCnt.classList.add('list-cnt');

            var itemPrice = document.createElement('p');
            itemPrice.textContent = itemPriceInput.value;
            itemPrice.classList.add('list-price');

            itemNameInput.replaceWith(itemName);
            itemCntInput.replaceWith(itemCnt);
            itemPriceInput.replaceWith(itemPrice);
        });
    }
});