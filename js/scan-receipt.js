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
    var listContainer = document.getElementById('receipt-container');
    var selectedItem = null;
    var shareBox = null;

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
                listContainer.style.height = (parseInt(getComputedStyle(listContainer).height) - 35) + 'px';
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
            listContainer.style.height = (parseInt(getComputedStyle(listContainer).height) + 56) + 'px';
            listAddButton.style.display = 'block';
            addDeleteButtons();
            shareText.classList.remove('disabled');
        } else {
            correctionText.textContent = '수정';
            titleText.textContent = '영수증';
            listItems.forEach(function(item) {
                item.style.border = 'none';
                item.style.borderRadius = '0';
                item.style.padding = '0';
            });
            listHeaderDiv.style.columnGap = '40px';
            listContainer.style.height = (parseInt(getComputedStyle(listContainer).height) - 56) + 'px';
            listAddButton.style.display = 'none';
            removeDeleteButtons();
            calculateSum(); 
            shareText.classList.add('disabled');
        }
    });

    shareText.addEventListener('click', function() {
        if (correctionText.textContent !== '완료') {
            return;
        }

        if (shareText.textContent === '나누기') {
            shareText.textContent = '취소';
            saveText.textContent = '다음';
            shareText.style.color = '#707174';
            shareText.style.backgroundColor = '#F0F2F6';

            setTimeout(function() {
                shareText.style.color = '';
                shareText.style.backgroundColor = '';
            }, 500);

            shareBox = document.createElement('div');
            shareBox.style.color = '#FFF';
            shareBox.style.width = '320px';
            shareBox.style.height = '39px';
            shareBox.style.display = 'flex';
            shareBox.style.fontSize = '14px';
            shareBox.style.marginTop = '35px';
            shareBox.style.borderRadius = '8px';
            shareBox.style.alignItems = 'center';
            shareBox.style.padding = '8px 0 8px 14px';
            shareBox.style.backgroundColor = '#464D57';
            shareBox.textContent = '같이 산 물건을 선택해주세요';
            listContainer.appendChild(shareBox);

            var listInputs = document.querySelectorAll('.list input');
            listInputs.forEach(function(input) {
                input.disabled = true;
                input.style.background = 'none';
            });

            listItems.forEach(function(item) {
                item.addEventListener('click', toggleBorder);
            });

        } else {
            shareText.textContent = '나누기';
            saveText.textContent = '저장하기';
            var listInputs = document.querySelectorAll('.list input');
            listInputs.forEach(function(input) {
                input.disabled = false;
            });

            listItems.forEach(function(item) {
                item.removeEventListener('click', toggleBorder);
                item.style.background = '#FFF';
                item.style.border = '1px solid #F0F2F6';
            });

            if (shareBox) {
                shareBox.style.display = 'none';
            }
        }
    });

    saveText.addEventListener('click', function() {
        if (saveText.textContent === '선택' && selectedItem) {
            var shareAmount = prompt('몇 명과 나누시겠습니까?');
            if (shareAmount !== null && shareAmount > 0) {
                shareAmount = Math.round(parseFloat(shareAmount));

                var itemCntInput = selectedItem.querySelector('.list-cnt-input');
                var itemPriceInput = selectedItem.querySelector('.list-price-input');

                var originalCnt = parseFloat(itemCntInput.value);
                var originalPrice = parseFloat(itemPriceInput.value);

                var oldCntStriked = document.createElement('span');
                oldCntStriked.style.textDecoration = 'line-through';
                oldCntStriked.textContent = itemCntInput.value;

                var oldPriceStriked = document.createElement('span');
                oldPriceStriked.style.textDecoration = 'line-through';
                oldPriceStriked.textContent = itemPriceInput.value;

                var newCnt = document.createElement('div');
                newCnt.textContent = originalCnt + "/" + shareAmount;
                newCnt.style.color = '#ED4B62';
                newCnt.style.fontSize = '10px';

                var newPrice = document.createElement('div');
                newPrice.textContent = Math.round(originalPrice / shareAmount);
                newPrice.style.color = '#ED4B62';
                newPrice.style.fontSize = '10px';

                itemCntInput.replaceWith(oldCntStriked);
                oldCntStriked.parentNode.appendChild(newCnt);

                itemPriceInput.replaceWith(oldPriceStriked);
                oldPriceStriked.parentNode.appendChild(newPrice);

                selectedItem.style.border = '1px solid #F0F2F6';
                selectedItem.style.backgroundColor = '#FFF';
                selectedItem = null;
                
                saveText.textContent = '다음';
                if (shareBox) {
                    shareBox.style.display = 'none';
                }

                calculateSum();
            }
        }
    });

    function toggleBorder(event) {
        var item = event.currentTarget;
        if (selectedItem) {
            selectedItem.style.border = '1px solid #F0F2F6';
            selectedItem.style.backgroundColor = '#FFF';
        }
        if (selectedItem !== item) {
            item.style.backgroundColor = '#FFF6F8';
            item.style.border = '1px solid #FFBEC7';
            selectedItem = item;
            saveText.textContent = '선택';
        } else {
            selectedItem = null;
            saveText.textContent = '저장하기';
        }
    }

    function calculateSum() {
        var total = 0;
        var taxValue = parseFloat(tax.textContent);
        for (var i = 0; i < prices.length; i++) {
            total += parseFloat(prices[i].textContent);
        }
        sum.textContent = total + taxValue;
    }
    calculateSum();

    listAddButton.addEventListener('click', function() {
        var newItem = document.createElement('div');
        newItem.classList.add('list');

        newItem.style.padding = '12px';
        newItem.style.borderRadius = '8px';
        newItem.style.border = '1px solid #F0F2F6';

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
            listContainer.style.height = (parseInt(getComputedStyle(listContainer).height) - 35) + 'px';
        });

        listBody.insertBefore(newItem, listAddButton);
        listContainer.style.height = (parseInt(getComputedStyle(listContainer).height) + 35) + 'px';
        listItems = document.querySelectorAll('.list');

        calculateSum();
    });

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