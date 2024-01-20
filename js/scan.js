document.addEventListener("DOMContentLoaded", function() {
    startWebcam();
});

function startWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            var video = document.getElementById('webcam');
            if (video) {
                video.srcObject = stream;
            } else {
                console.error('Video element not found.');
            }
        })
        .catch(function(error) {
            console.error('Error accessing webcam:', error);
        });
}