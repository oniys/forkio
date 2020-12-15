document.getElementById("triggerMenu").onclick = function() {
    open()
};
function open() {
    document.getElementById("menuList").classList.toggle("show");
    document.getElementById("first").classList.toggle("show");
    document.getElementById("four").classList.toggle("show");
    document.getElementById("second").classList.toggle("burgerY");
    document.getElementById("third").classList.toggle("burgerX");
}

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