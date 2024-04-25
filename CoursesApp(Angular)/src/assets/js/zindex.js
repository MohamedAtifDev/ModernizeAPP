window.onload = function() {
    var x = document.querySelectorAll("a#headerCollapse")[0];
    x.addEventListener("click", function() {
        document.getElementById("sidebar").style.left = '0px';
    })

    var x = document.querySelectorAll("div#sidebarCollapse")[0];
    x.addEventListener("click", function() {
        document.getElementById("sidebar").style.left = '-270px';
    })

    var photo = document.querySelector("a[data-bs-toggle='dropdown']");
    var show = false;
    photo.addEventListener("click", function() {

        var dropdownmenu = document.querySelector(".dropdown-menu.dropdown-menu-end.dropdown-menu-animate-up");
        dropdownmenu.classList.toggle("show");
        show = !show

    })
}