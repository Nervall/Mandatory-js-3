let ul = document.querySelector('ul');
let main = document.querySelector('main');
let section = document.querySelector('section ul');
//let a = document.querySelector('a');
let hash = '';
let hashSub ='';
//let hash2;

function checkChilds() {
    let child = main.childNodes;
    for (let i = 0; i < child.length; i++) {
        setTimeout(function(){ 
            while (child.length > 3) {   
                main.removeChild(main.lastChild);
            }
            /*
            if (child.length > 2) {
            main.removeChild(child[3]);
            main.parentNode.removeChild(a);
            main.removeChild(child[4]); 
        } */
    }, 200);
    }   
}


window.addEventListener("hashchange", function() {
    hash = window.location.hash.substring(1);
    main.innerHTML = ' ';
    section.innerHTML = ' ';
    main.innerHTML = '<h3>' + capitalize(hash) + '</h3>';
    //let check = document.querySelector("main").hasChildNodes();

    request('GET', 'https://dog.ceo/api/breed/'+ hash +'/images/random', breedPicture);
    request('GET', "https://dog.ceo/api/breed/" + hash +"/list", subBreedList);
    checkChilds();
});

function deleteImg(){
        
    let selectImg = document.querySelector('img');
    main.parentNode.removeChild(selectImg);
}

/* ---- GET FIRST LETTER UPPERCASE ---- */
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* ---- REQUESTS ---- */
function request(method, url, run) {
    let req = new XMLHttpRequest();
    req.addEventListener("load", run); 
    req.open(method, url);
    req.send();
    }


/* ---- GET ALL BREEDS LIST ON FIRST PAGE ---- */
function renderAllBreedList() {
    let myArray = JSON.parse(this.responseText);
    let data = myArray.message;
    for (let dog in data) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute('href', '#' + dog);
        a.textContent = capitalize(dog);
        a.addEventListener('click', getBreedsRandomPicture);
        ul.appendChild(li);
        li.appendChild(a);
    }
}

/* ---- GET RANDOM PICTURE ON FIRST PAGE ---- */
function getRandomPicture() {
    main.innerHTML = ' ';
    main.innerHTML = '<h3 id="picheader">Random picture on dog</h3> ';
    request('GET', 'https://dog.ceo/api/breeds/image/random', randomPicture)
}

function randomPicture() {
    let pic = JSON.parse(this.responseText);
    let data = pic.message;
    let img = document.createElement('img');
    img.setAttribute('src', data);
    img.setAttribute('id', 'picture');
    main.appendChild(img);
    let button = document.createElement('input')
    button.setAttribute('value', 'New Picture');
    button.setAttribute('type', 'button');
    button.setAttribute('onClick', 'getRandomPicture()');
    main.appendChild(button);
}

/* ---- GET BREEDS RANDOM IMAGE ---- */
function getBreedsRandomPicture(e) {
    //let hash2 = hash;
    //console.log(hash2);
    hash = this.getAttribute('href').substring(1);
    console.log(hash);
    main.innerHTML = ' ';
    section.innerHTML = ' ';
    main.innerHTML = '<h3>' + capitalize(hash) + '</h3>';
    request('GET', 'https://dog.ceo/api/breed/'+ hash +'/images/random', breedPicture);
    request('GET', "https://dog.ceo/api/breed/" + hash +"/list", subBreedList)
    
}

function breedPicture() {
    let pic = JSON.parse(this.responseText);
    let data = pic.message;
    let img = document.createElement('img');
    img.setAttribute('src', data);
    img.setAttribute('id', 'picture');
    main.appendChild(img);
    let a = document.createElement('a')
    a.setAttribute('href', '#' + hash);
    a.setAttribute('class', 'PicButton');
    a.addEventListener('click', getBreedsRandomPicture);
    a.textContent = 'New Picture';
    main.appendChild(a);

}

/* ---- GET SUBBREEDS LIST ---- */ 
function subBreedList() {
    let myArray = JSON.parse(this.responseText);
    let data = myArray.message;
    if (data.length !== 0) {
        section.innerHTML = ' ';
        let h4 = document.createElement('h4');
        h4.textContent = ('Sub-breeds');
        section.appendChild(h4);
    }
    for (let key in data) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute('href', '#' +hash+'/'+ data[key]);
        a.addEventListener('click', subBreedsRandomPic);
        a.textContent = capitalize(data[key]);
        section.appendChild(li);
        li.appendChild(a);
    }
}

/* ---- GET SUBBREEDS RANDOM IMAGE ---- */
function subBreedsRandomPic(e) {
    hash2 = hashSub;
    hashSub = this.getAttribute('href').substring(1);
    main.innerHTML = ' ';
    main.innerHTML = '<h3>' + capitalize(hashSub)  + '</h3>';
    request('GET', 'https://dog.ceo/api/breed/'+ hashSub +'/images/random', subBreedPicture)
}

function subBreedPicture() {
    let pic = JSON.parse(this.responseText);
    let data = pic.message;
    let img = document.createElement('img');
    img.setAttribute('src', data);
    img.setAttribute('id', 'picture');
    main.appendChild(img);
    let a2 = document.createElement('a')
    //a2.setAttribute('href', '#' + hash);
    //a2.setAttribute('class', 'PicButton');
    //a2.addEventListener('click', getBreedsRandomPicture);
    //a2.textContent = 'Back';
    //main.appendChild(a2);
    let a = document.createElement('a')
    a.setAttribute('href', '#' + hashSub);
    a.setAttribute('class', 'PicButton');
    a.textContent = 'New Picture';
    a.addEventListener('click', subBreedsRandomPic)
    main.appendChild(a);

}

request('GET', 'https://dog.ceo/api/breeds/list/all', renderAllBreedList);
getRandomPicture();

