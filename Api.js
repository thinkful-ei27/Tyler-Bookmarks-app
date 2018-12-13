'use strict';
const Api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/tyler/bookmarks';

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
    $('.bookmark-staging-area').submit(event => {
      event.preventDefault();
      const userjson = $(event.target).serializeJson();
      console.log(userjson);
      addBookmark(userjson, testSuccess, testError);
      
    });
  };
  
  function addBookmark(jsonobject, onSuccess, onError){
    $.ajax({
      url:BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: jsonobject,
      success: onSuccess,
      error: onError
    });
  };
  
  
  
  const testSuccess = function(){console.log('something worked')};
  const testError = function(){console.log('something is wrong')}


  return{
    captureInput,
  };


}());