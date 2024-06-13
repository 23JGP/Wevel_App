const originalTitle = document.getElementById('title').textContent;
const originalLeftSrc = document.getElementById('left').src;

document.getElementById('setting').addEventListener('click', function() {
    var menu = document.getElementById('setting-menu');
    if (menu.style.display === 'none') {
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
      document.getElementById('title').textContent = originalTitle;
      document.getElementById('left').src = originalLeftSrc;
    }
});

document.getElementById('folder-correction').addEventListener('click', function() {
    window.location.href = '../html/travel-folder.html';
});

const popupBox = document.getElementById('popup');
document.getElementById('folder-delete').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('overlay').style.display = 'block';
});

document.getElementById('popup-cancle').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});

document.getElementById('delete-receipt').addEventListener('click', function() {
    document.getElementById('title').textContent = '영수증 삭제';
    document.getElementById('left').src = '../img/x-black.png';
    document.getElementById('setting-menu').style.display = 'none';

    const moneyBoxes = document.querySelectorAll('.money-box');
    let selectedBox = null;

    moneyBoxes.forEach(box => {
        box.style.width = '320px';
        box.style.cursor = 'pointer';
        box.style.borderRadius = '10px';
        box.style.border = '1px solid #F0F2F6';

        box.addEventListener('click', function() {
            selectedBox = box;
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('popup').style.display = 'flex';
        });
    });

    document.getElementById('popup-delete').addEventListener('click', function() {
        if (selectedBox) {
            selectedBox.remove();
            document.getElementById('popup').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }
    });
});

document.getElementById('left').addEventListener('click', function(event) {
    if (document.getElementById('left').src.includes('x-black.png')) {
        event.preventDefault();
        document.getElementById('title').textContent = originalTitle;
        document.getElementById('left').src = originalLeftSrc;

        if (originalTitle === '일본') {
            const moneyBoxes = document.querySelectorAll('.money-box');
            moneyBoxes.forEach(box => {
                box.removeAttribute('style');
            });
        }
    } else if (document.getElementById('left').src.includes('left.png')) {
        window.location.href = '../index.html';
    }
});

const menuItems = document.querySelectorAll('#setting-menu p');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
      document.getElementById('setting-menu').style.display = 'none';
    });
});