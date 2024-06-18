document.addEventListener('DOMContentLoaded', function() {
    const logout = document.getElementById('logout');
    const resign = document.getElementById('resign');
    const overlay = document.createElement('div');
    const popupDiv = document.createElement('div');
    const popupTitle = document.createElement('p');
    const popupContent = document.createElement('p');
    const buttonDiv = document.createElement('div');
    const cancelButton = document.createElement('div');
    const deleteButton = document.createElement('div');

    overlay.className = 'overlay';
    popupDiv.className = 'popup-div';
    popupTitle.className = 'popup-title';
    popupContent.className = 'popup-content';
    buttonDiv.className = 'button-div';
    cancelButton.className = 'cancle-button';
    deleteButton.className = 'delete-button';

    document.body.appendChild(overlay);
    document.body.appendChild(popupDiv);

    logout.addEventListener('click', function() {
        overlay.style.display = 'block';
        popupDiv.style.display = 'block';
        buttonDiv.style.visibility = 'visible';
        popupTitle.textContent = logout.textContent;
        popupContent.textContent = '정말 로그아웃을 하시겠습니까?';
    });

    resign.addEventListener('click', function() {
        overlay.style.display = 'block';
        popupDiv.style.display = 'block';
        buttonDiv.style.visibility = 'visible';
        popupTitle.textContent = resign.textContent;
        popupContent.textContent = '정말 회원탈퇴를 하시겠습니까?';
    });

    cancelButton.addEventListener('click', function() {
        overlay.style.display = 'none';
        popupDiv.style.display = 'none';
        buttonDiv.style.visibility = 'invisible';
    });

    cancelButton.textContent = '취소';
    deleteButton.textContent = '삭제';

    popupDiv.appendChild(popupTitle);
    popupDiv.appendChild(popupContent);
    buttonDiv.appendChild(cancelButton);
    buttonDiv.appendChild(deleteButton);
    popupDiv.appendChild(buttonDiv);

});