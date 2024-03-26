import './../scss/index.scss';
function openNav(e) {
    e.stopPropagation();
    var x = document.getElementById("myNavbar");
    if (x.className === "nav") {
        x.className += " is-expanded";
    } else {
        x.className = "nav";
    }

}
document.getElementsByClassName("nav__toggle")[0].addEventListener("click", openNav);
