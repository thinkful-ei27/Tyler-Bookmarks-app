'use strict';
const DomManipulators = (function(){

  const addUserForm = function(){
    $('.js-bookmark-adder').on('click', (event => {
      event.preventDefault();
      console.log('youre clicking add a bookmark');
      Store.addingBookmark = !Store.addingBookmark;
      $('div.bookmark-staging-area').html(`
          <form action = "" class = "add-a-bookmark">
          <fieldset class="add-bookmark-fields">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" class = "new-title">
            <label for="url">URL</label>
            <input type="url" name="url" id="url" class = "new-url">
            <label for="description">Description</label>
            <textarea name="desc" id="description" class ="new-desc"></textarea>
            <label for="rating">Rating</label>
            <input type="number" name="rating" id="rating" class = "new-rating">
            <button type="submit">Add Bookmark</button>
          </fieldset>
          </form>`);
    }));
  };
  
  const handleFilterClick = function(){
    $('.js-filter').on('click', (event => {
      event.preventDefault();
      console.log('you have targeted the filter button');
      let filterval = $('#sort-selector').val();
      Store.filterValue = parseInt(filterval);
      render();
    }));
  };

  const generateHtml = function(bookmark){
    
    
    if(!bookmark.expanded){
      return  `<div style="border: 1px solid black;">
                <header>${bookmark.title}</header>
                <p>${bookmark.rating}</p>
                <label for = "expand">Expand</label>
                <input type="button" id ="expand" class = "expand" data-item-id = ${bookmark.id}>
                <div class = "js-expanded-placeholder">
                </div>
                </div>`;}
    if(bookmark.expanded){
      return `<div style="border: 1px solid black;">
      <header>${bookmark.title}</header>
      <p>${bookmark.rating}</p>
      <label for = "expand">Expand</label>
      <input type="button" id ="expand" class = "expand" data-item-id = ${bookmark.id}>
      <p>${bookmark.desc}</p>
      <label for = "delete">Delete Bookmark</label>
      <input type ="button" id ="delete" class = "js-delete" data-item-id = ${bookmark.id}>
      <a target="_blank" href="${bookmark.url}">Visit Site</a>
      </div>`;
    }
  
  };

  function getItemIdFromElement(item) {
    return $(item)
      .closest('input')
      .data('item-id');
  }

  const handleExpandedClick = function(){
    $('.js-bookmark-list').on('click', '.expand', function(event){
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      console.log(id);
      console.log('you are still clicking expand');
      const item = Store.findById(id);
      item.expanded = !item.expanded;
      render();
    });
  };              
  
  const handleDeleteClick = function(){
    $('.js-bookmark-list').on('click', '.js-delete', event => {
      const id = getItemIdFromElement(event.currentTarget);
      console.log('you clicked delete');
      Api.deleteItem(id, function(){
        Store.findAndDelete(id);
        render();
      });
    });
  };

  const render = function(){
    let items = Store.bookmarks;

    if (Store.filterValue === 2) {
      items = Store.bookmarks.filter(item => item.rating > 1);
    }

    if (Store.filterValue === 3) {
      items = Store.bookmarks.filter(item => item.rating > 2);
    }

    if (Store.filterValue === 4) {
      items = Store.bookmarks.filter(item => item.rating > 3);
    }

    if (Store.filterValue === 5) {
      items = Store.bookmarks.filter(item => item.rating === 5);
    }



    const bookmarksString = generateString(items);
    $('.js-bookmark-list').html(bookmarksString);
  };
  
  function generateString(bookmarks) {
    const items = bookmarks.map((item) => generateHtml(item));
    return items.join('');       
  }

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

  const handleSubmitNew = function(){ //this function sends the userform input to the server
    $('.bookmark-staging-area').submit(event => {
      event.preventDefault();
      // let bookmarkName = $('.new-title').val();
      // let bookmarkUrl = $('.new-url').val();
      // let bookmarkDesc = $('.new-desc').val();
      // let bookmarkRate = $('.new-rating').val();

      // let newBookmark = {
      //   title: bookmarkName,
      //   url: bookmarkUrl,
      //   desc: bookmarkDesc,
      //   rating: bookmarkRate,
      //   expanded: false
      // };
      
      
      // console.log(bookmarkName, bookmarkUrl, bookmarkDesc, bookmarkRate);

      const userjson = $(event.target).serializeJson();
      console.log(userjson);
      Api.addBookmarktoServer(userjson, function(response){
        console.log(response);
        response.expanded = false;
        Store.addItem(response);
        render();
      }, testError);
        
      
    });
    
  }; 
    
    
  
  const testSuccess = function(){console.log('something worked');};
  const testError = function(){console.log('something is wrong');};

 
  

  return{
    addUserForm,
    render,
    handleSubmitNew,
    handleExpandedClick,
    handleDeleteClick,
    handleFilterClick

  };




}());