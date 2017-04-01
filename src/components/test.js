function uploadImgFromPaste (file, type, isChrome) {
  var formData = new FormData();
  formData.append('image', file);
  formData.append('submission-type', type);
 
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload_image_by_paste');
  xhr.onload = function () {
    if ( xhr.readyState === 4 ) {
      if ( xhr.status === 200 ) {
        var data = JSON.parse( xhr.responseText ),
          tarBox = document.getElementById('tar_box');
        if ( isChrome ) {
          var img = document.createElement('img');
          img.className = 'my_img';
          img.src = data.store_path;
          tarBox.appendChild(img);
        }
      } else {
        console.log( xhr.statusText );
      }
    };
  };
  xhr.onerror = function (e) {
    console.log( xhr.statusText );
  }
  xhr.send(formData);
}