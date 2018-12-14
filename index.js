'use strict';

$(document).ready(function() {
  DomManipulators.render();
  DomManipulators.addUserForm();
  DomManipulators.captureInput();
  DomManipulators.handleExpandedClick();
  Api.getBookmarkData((bookmarks) => {
    bookmarks.forEach((bookmark) => Store.addItem(bookmark));
    bookmarks.forEach((bookmark) => bookmark.expanded = false);
    DomManipulators.render();
  });
});