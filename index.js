let imageUpload = document.getElementById('imageUpload');

imageUpload.addEventListener('change', function(event) {
  let file = event.target.files[0];

  let reader = new FileReader();

  reader.onload = function(event) {
    let image = document.createElement('img');
    image.src = event.target.result;

    let imageContainer = document.getElementById('imageContainer');
    imageContainer.appendChild(image);
  };

  reader.readAsDataURL(file);
});
