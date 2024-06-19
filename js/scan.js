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
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  processImage(canvas);
};

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
        return response.json();
      })
      .then((data) => {
        console.log("API 응답:", data);

        localStorage.setItem("receiptData", JSON.stringify(data));
        window.location.href = "scan-receipt.html";
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생:", error);
        alert("API 요청 중 오류 발생: " + error.message);
      });
  } else {
    console.error("유효한 텍스트가 없습니다.");
  }
};

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

const triggerFileInput = () => {
  document.getElementById("imageInput").click();
};

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

document.addEventListener("DOMContentLoaded", startWebcam);
