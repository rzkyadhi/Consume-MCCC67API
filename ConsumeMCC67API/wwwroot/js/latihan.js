function changeText() {
    var text2 = document.querySelectorAll(".container .row .col")[1];
    text2.innerHTML = "Changed !";
    return text2;
}

let mouseOver = document.querySelectorAll(".container .row .col");

for (let i = 0; i < mouseOver.length; i++) {
    mouseOver[i].addEventListener("mouseover", function (event) {
        event.target.style.color = "orange";

        setTimeout(function () {
            event.target.style.color = "";
        }, 500);
    }, false);
}