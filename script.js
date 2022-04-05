// let xmlhttp = new XMLHttpRequest();
// let numberOfImages = -1;

// xmlhttp.onreadystatechange = function() {
// if (xmlhttp.readyState == XMLHttpRequest.DONE) {
//     if (xmlhttp.status == 200) {
//     numberOfImages = (xmlhttp.responseText.match(/title="\d\d.jpg"/g) || []).length;
//     console.log(`There's ${numberOfImages} images`);
//     loadImages();
//     }
// }
// }

// xmlhttp.open("GET", './images', true);
// xmlhttp.send();

const textContent = {
  en: {
    heading:
      'Select all images with <span class="capcha__heading--bold">humans</span>',
    subHeading: 'Click "Verify" once there are none left',
    alertPositive:
      "You're right, no russian troops or officials seem to be human beings",
    alertNegative:
      "Let's face the truth: there are no humans among russians.\nTry again.",
    alertDefault: "Seems, you have not checked any images",
    btnCaption: "Verify",
  },
  ua: {
    subHeading: "Натисніть «Перевірити», відмітивши всі відповідні фото",
    heading:
      'Позначте всі фото, на фких зображено<span class="capcha__heading--bold">людей</span>',
    alertPositive: "Хіба русня не люди? Да ето так.\nВітаємо, ви пройшли тест!",
    alertNegative: "Ну що ж ви, хіба русня — то люди?\nДавайте ще раз.",
    alertDefault: "Схоже, ви не обрали жодної світлини",
    btnCaption: "Перевірити",
  },
};

const alerts = assignAlerts("en");

//-------------------------------------------------------------------
const numberOfImages = 15;
window.addEventListener("load", loadImages);
//-------------------------------------------------------------------

const submitBtn = document.querySelector(".capcha__submit-btn");
submitBtn.addEventListener("click", onSubmitBtnClick);

const langSwitch = document.querySelector(".capcha__icons");
langSwitch.addEventListener("click", onLangSwitchClick);

function loadImages() {
  const numArr = randomIntegerArray(9, numberOfImages);
  const itemArr = numArr.map(createItemEl);
  for (const item of itemArr) {
    item.addEventListener("click", onItemClick);
  }
  const containerGrid = document.querySelector(".capcha__grid");
  containerGrid.innerHTML = "";
  containerGrid.append(...itemArr);
}

function createItemEl(number) {
  const newEl = document.createElement("li");
  const fileName = (number + "").padStart(2, 0);
  newEl.innerHTML = `<img src="./images/${fileName}.jpg" alt="capture image" class="capcha__img" />`;
  newEl.classList.add("capcha__item");
  // console.log(newEl);
  return newEl;
}

function onItemClick(event) {
  event.currentTarget.classList.toggle("capcha__item--marked");
}

function onSubmitBtnClick() {
  if (document.querySelector(".capcha__icons--marked").length > 0) {
    alert(alerts.negative);
  }
  location.reload();
}

function randomIntegerArray(targetLength, range) {
  const cycleTreshold = 2000;
  const intArr = [];
  let n = 0;
  while (intArr.length < targetLength && n < cycleTreshold) {
    const newInt = Math.ceil(Math.random() * range);
    if (intArr.indexOf(newInt) === -1) {
      intArr.push(newInt);
    }
    n += 1;
  }
  console.log(`Generated intArr ${intArr} on ${n} iteration`);
  return intArr;
}

function onLangSwitchClick() {
  switchLang();
}

function switchLang(lang) {
  textContent[lang];
}

function assignAlerts(lang) {
  const { alertPositive, alertNegative, alertDefault, ...rest } =
    textContent[lang];
  return {
    positive: alertPositive,
    negative: alertNegative,
    default: alertDefault,
  };
}
