var navMain = document.querySelector('.main-menu');
var navToggle = document.querySelector('.main-menu__toggle');
var menuList = document.querySelector('.main-menu__list');

navMain.classList.remove('main-menu--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-menu--closed')) {
    navMain.classList.remove('main-menu--closed');
    navMain.classList.add('main-menu--opened');
  } else {
    navMain.classList.add('main-menu--closed');
    navMain.classList.remove('main-menu--opened');
  }
});

menuList.onclick = function(event) {
  var target = event.target;

  if(!target.nextElementSibling) {
    return;
  }
  if (target.nextElementSibling.tagName != 'DIV') {
    return;
  }
  show(target.nextElementSibling)
}

function show(selectedDiv) {
  if (selectedDiv.classList.contains('submenu--closed')) {
    selectedDiv.classList.remove('submenu--closed');
  } else {
    selectedDiv.classList.add('submenu--closed');
  }
}
