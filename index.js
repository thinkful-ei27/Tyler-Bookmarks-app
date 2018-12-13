'use strict';
$.fn.extend({
  serializeJson: function () {
    const formData = new FormData(this[0]);
    const jsonObj = {};
    formData.forEach((val, key) => {
      jsonObj[key] = val;
    });
    return JSON.stringify(jsonObj);
  }
});

function captureInput(){
  $('.add-a-bookmark').submit(event => {
    event.preventDefault();
    const testData = $(event.target).serializeJson();
    console.log(testData);
  });
}

$(document).ready(function () {
  captureInput();
});