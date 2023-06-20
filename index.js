document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  let form = new FormData();

  let file = document.getElementById('imageUpload').files[0];
  form.append('profile_image', file);

  const api = '';

  let XHR = new XMLHttpRequest();
  XHR.open('PATCH', api, true);
  XHR.onload = function () {
    if (XHR.status === 200) {
      console.log(XHR.responseText);
    } else {
      console.error(XHR.responseText);
    }
  }
  XHR.setRequestHeader(
    "",
    ""
  )
  XHR.send(form);
});
