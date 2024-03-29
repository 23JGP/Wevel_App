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
  Tesseract.recognize(image, "eng+jpn", {
    logger: (m) => {
      console.log(m);
    },
  })
    .then(({ data: { text } }) => {
      console.log(text);
      alert("텍스트: " + text);
    })
    .catch((err) => {
      console.error(err);
    });
};

document.addEventListener("DOMContentLoaded", startWebcam);

// 갤러리 버튼 클릭하면 파일 업로드
function triggerFileInput() {
    document.getElementById('imageInput').click();
  }
  
  function displaySelectedImage() {
    var input = document.getElementById('imageInput');
    var img = document.getElementById('gallery');
  
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function (e) {
        img.src = e.target.result;
      };
  
      reader.readAsDataURL(input.files[0]);
    }
  }
  