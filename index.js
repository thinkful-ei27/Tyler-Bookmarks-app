'use strict';

$(document).ready(function() {
  DomManipulators.render();
  DomManipulators.addUserForm();
  DomManipulators.captureInput();

  Api.getBookmarkData((bookmarks) => {
    bookmarks.forEach((bookmark) => Store.addItem(bookmark));
    DomManipulators.render();
  });
});