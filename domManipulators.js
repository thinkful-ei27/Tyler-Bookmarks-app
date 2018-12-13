'use strict';
const DomManipulators = (function(){

  const addUserForm = function(){
    $('.js-bookmark-control').submit(event => {
      event.preventDefault();
      console.log('youre clicking add a bookmark');
      // STORE.addingBookmark = true;
      $('div.bookmark-staging-area').html(`
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
  };
  

  return{
    addUserForm
  };




}());