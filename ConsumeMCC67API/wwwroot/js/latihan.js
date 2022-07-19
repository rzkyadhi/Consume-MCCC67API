/*document.getElementById("welcome").innerHTML = "Welcome To My Landing Page !";

const collection = document.getElementsByClassName("name");
collection[0].innerHTML = "My Name Is Rizky Adhi Nugroho";

const favorite = document.getElementsByTagName("li");
*//*document.getElementById("favorite").innerHTML = favorite[0].innerHTML;*//*

document.addEventListener("click", getFavoriteFunction);

document.querySelector(".list").style.backgroundColor = "red";
const nodeList = document.querySelectorAll(".listSecond");
for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].style.backgroundColor = "yellow";
}

function getFavoriteFunction() {
    let result = document.getElementById("favorite").innerHTML = favorite[1].innerHTML;
    return result;
}

function leastFavorite() {
    document.getElementById("leastFavorite").innerHTML = favorite[0].innerHTML;
}*/

/*const favorite = document.getElementsByTagName("li");
for (let i = 0; i < favorite.length; i++) {
    favorite[i].style.backgroundColor = "Yellow";
}*/

const nodeList = document.querySelectorAll("section#b ul#a li.list");
for (let i = 0; i < nodeList.length - 1; i++) {
    nodeList[i].style.backgroundColor = "yellow";
}