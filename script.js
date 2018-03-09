var $radioURL = $('#optionsRadios1');
var $radioImage = $('#optionsRadios2');
var $urlInput = $('#urlInput');
var $urlForm = $('#urlForm');
var $imageInput = $('#imageInput');
var $imageForm = $('#imageForm');
var $result = $('#result');
var $submitButton = $('#submit');
var imageBase64;

$radioURL.click(function() {
  $imageForm.hide();
  $urlForm.show();
});

$radioImage.click(function() {
  $imageForm.show();
  $urlForm.hide();
});

function readFile() {
  if (this.files && this.files[0]) {
    var FR= new FileReader();
    FR.addEventListener("load", function(e) {
      imageBase64 = e.target.result.split(',')[1];
    });
    FR.readAsDataURL( this.files[0] );
  }
}

$imageInput.change(readFile);


$submitButton.click(function(event) {
  var data = {};
  event.preventDefault();
  if ($radioURL.prop('checked')) {
    data.url = $urlInput.val();
  } else if ($radioImage.prop('checked')) {
    data.img64 = imageBase64
  }
  data = JSON.stringify(data);
  console.log(data);
  $.ajax({
    method: "POST",
    url: "http://galpr.gofindapi.com/api",
    headers:{
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "*"
    },
    dataType: 'json',
    contentType: "application-json",
    data: data
  }).done(function(result) {
    console.log(result);
    $result.text(result);
  }).fail(function(error) {
    console.log(error)
  });
});