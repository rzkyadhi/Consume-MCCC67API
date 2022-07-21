// function changeText() {
//     var text2 = document.querySelectorAll(".container .row .col")[0];
//     text2.innerHTML = "Changed !";
//     return text2;
// }

// let mouseOver = document.querySelectorAll(".container .row .col");

// for (let i = 0; i < mouseOver.length; i++) {
//     mouseOver[i].addEventListener("mouseover", function (event) {
//         event.target.style.color = "orange";

//         setTimeout(function () {
//             event.target.style.color = "";
//         }, 500);
//     }, false);
// }

// // Fundamentals
// const animals = [{
//         name: "Dory",
//         species: "fish",
//         class: {
//             name: "invertebrata"
//         }
//     },
//     {
//         name: "Garfield",
//         species: "cat",
//         class: {
//             name: "mamalia"
//         }
//     },
//     {
//         name: "Budi",
//         species: "cat",
//         class: {
//             name: "mamalia"
//         }
//     },
//     {
//         name: "Nemo",
//         species: "fish",
//         class: {
//             name: "invertebrata"
//         }
//     },
//     {
//         name: "Tom",
//         species: "cat",
//         class: {
//             name: "mamalia"
//         }
//     }
// ]

// let onlyCat = [];
// let vertebrata = [];
// // for (let i = 0; i < animals.length; i++) {
// //     if (animals[i].species == "cat") {
// //         onlyCat.push(animals[i]);
// //     }

// //     if (animals[i].class.name == "invertebrata") {
// //         animals[i].class.name = "Non Mamalia";
// //         vertebrata.push(animals[i]);
// //     }
// // }

// onlyCat = animals.filter(x => x.species == "cat");
// console.log(onlyCat);
// vertebrata = animals.filter(x => x.class.name == "invertebrata");
// for (let i = 0; i < vertebrata.length; i++){
//     vertebrata[i].class.name = "Non Mamalia";
// }
// console.log(vertebrata);

// var catz = [];
// var cats = catz;
// catz = animals.filter(x => x.species == "cat");
// cats = animals.filter(x => x.species == "fish");

// AJAX
$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/"
}).done((result) => {
    console.log(result.results);
    $.each(result.results, function (key, val) {
        console.log(val.name);
    })
});

$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/"
}).done((result) => {
    let text = "";
    $.each(result.results, function (key, val) {
        text += `<tr></tr>`
    })
});