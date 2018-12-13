'use strict';
function captureInput(){
  $('.add-a-bookmark').submit(event => {
    event.preventDefault();
    const testData = $(event.target).serializeArray();
    console.log(testData);
  });
}

$(document).ready(function () {
  captureInput();
});