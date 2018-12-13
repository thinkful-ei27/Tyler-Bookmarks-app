'use strict';

$(document).ready(function () {
  Api.captureInput();
  DomManipulators.addUserForm();
  Api.getBookmarkData(function(response){
    Store.bookmarks.push(...response);
    console.log(Store.bookmarks);
  });
});