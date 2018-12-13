'use strict';
const Api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/tyler/bookmarks';

  const addBookmark = function(jsonObject, onSuccess, onError){
    $.ajax({
      url:BASE_URL,
      method: 'POST',
      contentType: 'application//json',
      data: jsonObject,
      success: onSuccess,
      error: onError
    });
  };

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
  
  const captureInput = function(){
    $('.add-a-bookmark').submit(event => {
      event.preventDefault();
      const userjson = $(event.target).serializeJson();
      return userjson;
    });
  };


  return{
    captureInput,
    addBookmark
  };


}());