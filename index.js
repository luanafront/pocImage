let imageUpload = document.getElementById('imageUpload');
let imageContainer = document.getElementById('imageContainer');
let cameraButton = document.getElementById('cameraButton');
let photoCanvas = document.getElementById('photoCanvas');
let photoContext = photoCanvas.getContext('2d');
let videoStream;

imageUpload.addEventListener('change', function(event) {
  let file = event.target.files[0];
  let reader = new FileReader();

  reader.onload = function(event) {
    let image = new Image();
    image.src = event.target.result;
    imageContainer.appendChild(image);
  };

  reader.readAsDataURL(file);
});

cameraButton.addEventListener('click', function() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        videoStream = stream;
        let video = document.createElement('video');
        video.srcObject = videoStream;
        video.play();

        let captureFrame = function() {
          photoCanvas.width = video.videoWidth;
          photoCanvas.height = video.videoHeight;
          photoContext.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

          let imageDataURL = photoCanvas.toDataURL('image/png');
          console.log(imageDataURL);
        };

        let exitCamera = function() {
          stopCamera();
          cameraButton.removeEventListener('click', captureFrame);
          cameraButton.removeEventListener('click', exitCamera);
        };

        let stopCamera = function() {
          video.pause();
          video.srcObject = null;
          videoStream.getTracks().forEach(function(track) {
            track.stop();
          });
        };

        cameraButton.addEventListener('click', captureFrame);
        cameraButton.addEventListener('click', exitCamera);
      })
      .catch(function(error) {
        console.error('Ocorreu um erro ao acessar a câmera:', error);
      });
  } else {
    console.error('A captura de mídia não é suportada pelo seu navegador.');
  }
});
