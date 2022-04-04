let xmlhttp = new XMLHttpRequest();
let numberOfImages = -1;

xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == XMLHttpRequest.DONE) {
    if (xmlhttp.status == 200) {        
    numberOfImages = (xmlhttp.responseText.match(/title="\d\d.jpg"/g) || []).length;
    console.log(`There's ${numberOfImages} images`);
    loadImages();
    }
}
}

xmlhttp.open("GET", './images', true);
xmlhttp.send();

//-------------------------------------------------------------------
numberOfImages = 15;
loadImages();
//-------------------------------------------------------------------

const submitBtn = document.querySelector('.capcha__submit-btn');

function loadImages() {
    const numArr = randomIntegerArray(9, numberOfImages);
    const itemArr = numArr.map(createItemEl);
    for (const item of itemArr) {
        item.addEventListener('click', onItemClick);
    }
    const containerGrid = document.querySelector('.capcha__grid');
    containerGrid.innerHTML = '';
    containerGrid.append(...itemArr);
}

function createItemEl(number) {
    const newEl = document.createElement('li');
    const fileName = (number + '').padStart(2,0);
    newEl.innerHTML = (`<img src="./images/${fileName}.jpg" alt="capture image" class="capcha__img" />`);
    newEl.classList.add('capcha__item');
    console.log(newEl);
    return newEl;
  }

function onItemClick(event) {
    event.currentTarget.classList.toggle('capcha__item--marked');
}

submitBtn.addEventListener('click', onSubmitBtnClick);

function onSubmitBtnClick() {
    alert('There is no humans among russians.\nTry again.');
    location.reload();
}

function randomIntegerArray(targetLength, range) {
    const cycleTreshold = 2000;
    const intArr = [];
    let n = 0;
    while ((intArr.length < targetLength) && (n < cycleTreshold))
    {
        const newInt = Math.ceil(Math.random() * range);
        if (intArr.indexOf(newInt) === -1) {
            intArr.push(newInt);
        }
        n += 1;
    }
    console.log(`Generated intArr ${intArr}`)
    return intArr;
}

// function getNumberOfJpegs(folder) {

//     let xmlhttp = new XMLHttpRequest();
//     let numberOfImages = -1;

//     xmlhttp.onreadystatechange = function() {
//     if (xmlhttp.readyState == XMLHttpRequest.DONE) {
//         if (xmlhttp.status == 200) {        
//         return (xmlhttp.responseText.match(/title="\d\d.jpg"/g) || []).length;
//         //   for (let i = 1; i <= numberOfImages; i++) {
//         //     let img1 = document.createElement('img');
//         //     img1.src = './images/' + i.toString().padStart(2,'0') + '.jpg';
//         //     document.body.appendChild(img1);
//         //   }
//         }
//     }
//     }

//     xmlhttp.open("GET", folder, true);
//     xmlhttp.send();

//     console.log(`There's ${numberOfImages} images`)
//     return numberOfImages;
    
// }