document.querySelector("p").addEventListener("scroll", function(element) {
    alert("scrolled");
    element.classList.add("d-block animate__animated animate__fadeInDown");
});