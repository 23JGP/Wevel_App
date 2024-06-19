const video = document.getElementById("webcam");

const startWebcam = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error("웹캠에 접근하는 중 오류 발생:", error);
    });
};

const scanImage = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = video.cameraWidth;
  canvas.height = video.cameraHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  processImage(canvas);
};

// 파일 입력이 변경되었을 때 이미지를 처리하는 함수
const handleImageChange = () => {
  const input = document.getElementById("imageInput");
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = function () {
        processImage(img);
      };
    };

    reader.readAsDataURL(file);
  } else {
    console.error("이미지 파일을 선택하세요.");
  }
};

// 이미지를 인식하여 텍스트로 변환하는 함수
const processImage = (image) => {
  showLoadingRedirect();
  Tesseract.recognize(image, "eng+jpn", {
    logger: (m) => console.log(m),
  })
    .then(({ data: { text } }) => {
      console.log(text);
      alert("텍스트: " + text);
      sendTextToAPI(text);
    })
    .catch((err) => console.error(err));
};

// 일본식 숫자를 아라비아 숫자로 변환하는 함수
const convertJapaneseNumbers = (input) => {
  const japaneseNumbers = {
    "①": "1",
    "②": "2",
    "③": "3",
    "④": "4",
    "⑤": "5",
    "⑥": "6",
    "⑦": "7",
    "⑧": "8",
    "⑨": "9",
    "⑩": "10",
    "⑪": "11",
    "⑫": "12",
    "⑬": "13",
    "⑭": "14",
    "⑮": "15",
    "⑯": "16",
    "⑰": "17",
    "⑱": "18",
    "⑲": "19",
    "⑳": "20",
  };

  let result = input.replace(/\n/g, " ").replace(/\\[\s\n\r]*/g, "");
  for (const [japanese, arabic] of Object.entries(japaneseNumbers)) {
    result = result.replace(new RegExp(japanese, "g"), arabic);
  }

  return result;
};

// 텍스트를 API로 전송하는 함수
const sendTextToAPI = (text) => {
  const convertedText = convertJapaneseNumbers(text);
  console.log(convertedText);

  if (convertedText) {
    const url = "http://localhost:8085/api/openai/chat";
    const body = JSON.stringify({ prompt: convertedText.trim() });

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
      })
      .then((data) => {
        console.log("API 응답:", data);

        // 예시 데이터
        const receiptData = {
          items: [
            { item: "라멘", price: 68, quantity: 1 },
            { item: "오니자이", price: 98, quantity: 1 },
            { item: "이치고 초콜릿", price: 228, quantity: 1 },
            { item: "톤카우", price: 88, quantity: 2 },
          ],
          tax: 45,
          total: 527,
        };

        localStorage.setItem("receiptData", JSON.stringify(receiptData));
        // window.location.href = "scan-receipt.html";
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생:", error);
        alert("API 요청 중 오류 발생: " + error.message);
      });
  } else {
    console.error("유효한 텍스트가 없습니다.");
  }
};

// 선택한 이미지를 표시하는 함수
const displaySelectedImage = () => {
  const input = document.getElementById("imageInput");
  const img = document.getElementById("gallery");

  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

// 파일 입력 트리거 함수
const triggerFileInput = () => {
  document.getElementById("imageInput").click();
};

// 로딩 GIF를 표시하고 페이지를 리디렉션하는 함수
const showLoadingRedirect = () => {
  const gifContainer = document.createElement("div");
  gifContainer.className = "gif";
  gifContainer.innerHTML = '<img src="../img/loading.gif" alt="Loading...">';
  document.body.appendChild(gifContainer);

  setTimeout(() => {
    // window.location.href = "./scan-receipt.html";
    document.body.removeChild(gifContainer);
  }, 3000);
};

// DOM이 로드되면 웹캠을 시작
document.addEventListener("DOMContentLoaded", startWebcam);
