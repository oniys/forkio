function myFunction(x) {

    if (x.matches) {
        document.getElementById("menuList").classList.add("show");
    } else {
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
    const asMenu = target === menu || menu.contains(target);
    const asBtnMenu = target === btnMenu;
    const menuActive = menu.classList.contains('show');
    if (!asMenu && !asBtnMenu && !menuActive) {
        toggleMenu();
    }
});