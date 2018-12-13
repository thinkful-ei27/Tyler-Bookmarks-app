'use strict';
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

function addUserForm(){
  $('.js-bookmark-control').submit(event => {
    event.preventDefault();
    console.log('youre clicking add a bookmark');
    // STORE.addingBookmark = true;
    $("div.bookmark-staging-area").html(`
    <form action = "" class = "add-a-bookmark">
    <fieldset class="add-bookmark-fields">
      <label for="title">Title</label>
      <input type="text" name="title" id="title">
      <label for="url">URL</label>
      <input type="url" name="url" id="url">
      <label for="description">Description</label>
      <textarea name="desc" id="description"></textarea>
      <label for="rating">Rating</label>
      <input type="number" name="rating" id="rating">
      <button type="submit">Add Bookmark</button>
    </fieldset>
    </form>`);
  });
}

const testSuccess = function(){console.log('something worked')};
const testError = function(){console.log('something is wrong')}

$(document).ready(function () {
  captureInput();
  addUserForm();
  
});