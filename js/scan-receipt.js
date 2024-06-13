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

            var taxInput = document.createElement('input');
            taxInput.type = 'number';
            taxInput.value = tax.textContent;
            taxInput.classList.add('tax-input');
            taxInput.style.outline = 'none';
            taxInput.style.textAlign = 'right';
            taxInput.style.borderRadius = '4px';
            taxInput.style.paddingRight = '8px';
            taxInput.style.fontFamily = 'Pretendard';
            taxInput.style.border = '1px solid rgb(240, 242, 246)';
            tax.replaceWith(taxInput);

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
            listHeaderDiv.style.columnGap = '70px';
            listContainer.style.height = (parseInt(getComputedStyle(listContainer).height) - 56) + 'px';
            listAddButton.style.display = 'none';
            removeDeleteButtons(); 
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
            let shareAmount = null;
            do {
                shareAmount = prompt('몇 명과 나누시겠습니까?');
            } while (shareAmount === null || shareAmount.trim() === '' || parseInt(shareAmount) === 0);

            if (shareAmount !== null && parseInt(shareAmount) > 0) {
                shareAmount = parseInt(shareAmount);

                var itemCntInput = selectedItem.querySelector('.list-cnt-input');
                var itemPriceInput = selectedItem.querySelector('.list-price-input');

                var originalCnt = parseFloat(itemCntInput.value);
                var originalPrice = parseFloat(itemPriceInput.value);

                var oldCntContainer = document.createElement('p');
                oldCntContainer.style.textDecoration = 'line-through';
                oldCntContainer.textContent = itemCntInput.value;
                oldCntContainer.classList.add('list-cnt');

                var oldPriceContainer = document.createElement('p');
                oldPriceContainer.style.textDecoration = 'line-through';
                oldPriceContainer.textContent = itemPriceInput.value;
                oldPriceContainer.classList.add('list-price');

                var newCnt = document.createElement('p');
                newCnt.textContent = originalCnt + "/" + shareAmount;
                newCnt.style.color = '#ED4B62';
                newCnt.style.fontSize = '10px';
                newCnt.style.textAlign = 'center';

                var newPrice = document.createElement('p');
                newPrice.textContent = Math.round(originalPrice / shareAmount);
                newPrice.style.color = '#ED4B62';
                newPrice.style.fontSize = '10px';
                newPrice.style.textAlign = 'right';

                var newValuesWrapper = document.createElement('div');
                newValuesWrapper.appendChild(newCnt);
                newValuesWrapper.appendChild(newPrice);
                newValuesWrapper.classList.add('list-child');
                newValuesWrapper.style.display = 'flex';

                itemCntInput.replaceWith(oldCntContainer);
                itemPriceInput.replaceWith(oldPriceContainer);

                selectedItem.appendChild(newValuesWrapper);
                selectedItem.style.border = '1px solid #F0F2F6';
                selectedItem.style.backgroundColor = '#FFF';
                selectedItem = null;

                saveText.textContent = '다음';
                if (shareBox) {
                    shareBox.style.display = 'none';
                }
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
            listContainer.style.height = (parseInt(getComputedStyle(listContainer).height) - 35) + 'px';
        });
    
        listBody.insertBefore(newItem, listAddButton);
        listContainer.style.height = (parseInt(getComputedStyle(listContainer).height) + 35) + 'px';
        listItems = document.querySelectorAll('.list');
    
        var itemName = newItem.querySelector('.list-name-input');
        var itemCnt = newItem.querySelector('.list-cnt-input');
        var itemPrice = newItem.querySelector('.list-price-input');
    
        itemName.addEventListener('input', function() {
            newItem.style.textDecoration = 'none';
        });
    
        itemCnt.addEventListener('input', function() {
            newItem.style.textDecoration = 'none';
        });
    
        itemPrice.addEventListener('input', function() {
            newItem.style.textDecoration = 'none';
        });
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