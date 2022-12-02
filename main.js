document.querySelector(".icon-container").onclick = function () {
  document.querySelector(".setting-box").classList.toggle("open");
  document.querySelector(".fa-gear").classList.toggle("fa-spin");
};

if (window.localStorage.getItem('color')) {
  document.documentElement.style.setProperty('--main-color', localStorage.getItem('color'));
  document.querySelectorAll('.color-list li').forEach(element => {
    element.classList.remove('active');
    if (element.dataset.color === localStorage.getItem('color')) {
      element.classList.add('active');
    }
  });
}
let colorsArr = document.querySelectorAll(".color-list li");
colorsArr.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
    window.localStorage.setItem("color", e.target.dataset.color);
    handleActiveClasses(e);
  });
});

let backgroundOption = true;
let time;
if (window.localStorage.getItem('background-option')) {
  if (window.localStorage.getItem('background-option') === 'true') {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll('.active').forEach(element => {
    element.classList.remove('active');
  });
  if (window.localStorage.getItem('background-option') === 'true') {
    document.querySelector('.random-background .yes').classList.add('active');
  } else {
    document.querySelector('.random-background .no').classList.add('active');
  }
}
let randomBackground = document.querySelectorAll(".random-background span");
randomBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActiveClasses(e);
    if (e.target.dataset.background === 'yes') {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem('background-option', true);
    } else {
      backgroundOption = false;
      clearInterval(time);
      localStorage.setItem('background-option', false);
    }
  });
});
let landingPage = document.querySelector(".landing");
let imgsArr = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];
function randomizeImgs() {
  if (backgroundOption === true) {
    time = setInterval(() => {
      let randomImg = Math.floor(Math.random() * imgsArr.length);
      landingPage.style.backgroundImage = 'url("imgs/' + imgsArr[randomImg] + '")';
    }, 10000);
  };
};
randomizeImgs();

let section = document.querySelector(".skills");
let spans = document.querySelectorAll(".prog span");
window.onscroll = function () {
  if (window.scrollY >= section.offsetTop - 200) {
    spans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};

let ourImgs = document.querySelectorAll('.gallery img');
ourImgs.forEach((img) => {
  img.addEventListener('click', (e) => {

    let overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    document.body.appendChild(overlay);

    let popupBox = document.createElement('div');
    popupBox.className = 'popup-box';
    if (img.alt !== null) {
      let imgHeading = document.createElement('h3');
      let headTxt = document.createTextNode(img.alt);
      imgHeading.appendChild(headTxt);
      popupBox.appendChild(imgHeading);
    };

    let popupImg = document.createElement('img');
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);
    document.body.appendChild(popupBox);

    let closeSpan = document.createElement('span');
    closeSpan.className = 'close-btn';
    let closeSpanTxt = document.createTextNode('X');
    closeSpan.appendChild(closeSpanTxt);
    popupBox.appendChild(closeSpan);

  });
});
document.addEventListener('click', (e) => {
  if (e.target.className == 'close-btn') {
    e.target.parentNode.remove();
    document.querySelector('.popup-overlay').remove();
  };
});

let bulletSpans = document.querySelectorAll('.nav-bullets .bullets');
let allLinks = document.querySelectorAll('.nav a');
function scrollToSpecificSection(element) {
  element.forEach(ele => {
    ele.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });
};
scrollToSpecificSection(bulletSpans);
scrollToSpecificSection(allLinks);

function handleActiveClasses(ev) {
  ev.target.parentElement.querySelectorAll('.active').forEach(element => {
    element.classList.remove('active');
  });
  ev.target.classList.add('active');
};

let bulletsOption = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets');
if (localStorage.getItem('bullets_option')) {
  bulletsOption.forEach(span => {
    span.classList.remove('active');
  });
  if (localStorage.getItem('bullets_option') === 'block') {
    bulletsContainer.style.display = 'block';
    document.querySelector('.bullets-option .yes').classList.add('active');
  } else {
    bulletsContainer.style.display = 'none';
    document.querySelector('.bullets-option .no').classList.add('active');
  };
};
bulletsOption.forEach(span => {
  span.addEventListener('click', e => {
    if (span.dataset.display === 'block') {
      bulletsContainer.style.display = 'block';
      localStorage.setItem('bullets_option', e.target.dataset.display);
    } else {
      bulletsContainer.style.display = 'none';
      localStorage.setItem('bullets_option', e.target.dataset.display);
    };
    handleActiveClasses(e);
  });
});

document.querySelector('.reset-options').onclick = function () {
  localStorage.removeItem('color');
  localStorage.removeItem('background-option');
  localStorage.removeItem('bullets_option');
  window.location.reload();
};

let toggleBtn = document.querySelector('.toggle-menu');
let toggleLinks = document.querySelector('.nav');
toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle('menu-active');
  toggleLinks.classList.toggle('open');
};
document.addEventListener('click', e => {
  if(e.target !== toggleBtn && e.target !== toggleLinks) {
    if (toggleLinks.classList.contains('open')) {
      toggleBtn.classList.toggle('menu-active');
      toggleLinks.classList.toggle('open');
    };
  };
});
toggleLinks.onclick = function (e) {
  e.stopPropagation();
};