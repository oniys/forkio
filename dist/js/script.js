function appWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    }
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

appWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }else{
        document.querySelector('body').classList.add('no-webp');
    }
});;
function myFunction(x) {

    if (x.matches) {
        document.getElementById("menuList").classList.add("show");
        document.getElementById("triggerMenu").classList.add("show");
    } else {
        document.getElementById("triggerMenu").classList.remove("show");
        document.getElementById("menuList").classList.remove("show");
        document.getElementById("first").classList.remove("show");
        document.getElementById("four").classList.remove("show");
        document.getElementById("second").classList.remove("burgerY");
        document.getElementById("third").classList.remove("burgerX");
    }
}


let x = window.matchMedia("(max-width: 481px)")
myFunction(x)
x.addListener(myFunction)

const menu = document.getElementById('menuList');
const menuList = document.getElementById('triggerMenu')
const toggleMenu = function() {
    menu.classList.toggle('show');
}
const btnMenu = document.getElementById("triggerMenu");
btnMenu.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
});
document.addEventListener('click', function(e) {
    const target = e.target;
    const menuInd = menuList.classList.contains('show');
    const asMenu = target === menu || menu.contains(target);
    const asBtnMenu = target === btnMenu;
    const menuActive = menu.classList.contains('show');

    console.log()
    if (!asMenu && !asBtnMenu && !menuActive && menuInd) {
        toggleMenu();
    }
});;

