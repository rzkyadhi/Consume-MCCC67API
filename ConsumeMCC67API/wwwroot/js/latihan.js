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

// Fundamentals
const animals = [{
        name: "Dory",
        species: "fish",
        class: {
            name: "invertebrata"
        }
    },
    {
        name: "Garfield",
        species: "cat",
        class: {
            name: "mamalia"
        }
    },
    {
        name: "Budi",
        species: "cat",
        class: {
            name: "mamalia"
        }
    },
    {
        name: "Nemo",
        species: "fish",
        class: {
            name: "invertebrata"
        }
    },
    {
        name: "Tom",
        species: "cat",
        class: {
            name: "mamalia"
        }
    }
]

const onlyCat = [];
const vertebrata = []
for (let i = 0; i < animals.length; i++) {
    if (animals[i].species == "cat") {
        onlyCat.push(animals[i]);
    }

    if (animals[i].class.name == "invertebrata") {
        animals[i].class.name = "Non Mamalia";
        vertebrata.push(animals[i]);
    }
}