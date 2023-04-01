let drinksContainer = document.querySelector("#drink-menu");
let hotButton = document.querySelector("#hot");
let icedButton = document.querySelector("#iced");

let cupholder = document.querySelector("#cupholder")
let clearCupholderButton = document.querySelector('#clear-cupholder')

let selectedDrinks = []

let storedDrinks = JSON.parse(localStorage.getItem('history'))
console.log(storedDrinks)

function displayStoredDrinks() {
    if(localStorage.getItem('history').length > 0)
    storedDrinks.forEach(storedDrink => {
        cupholder.insertAdjacentHTML("beforeend", storedDrink)
    })
}

function displayDrinks(type) {
    drinksContainer.innerHTML = ''
    fetch(`https://api.sampleapis.com/coffee/${type}`)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((drink) => {
            drinksContainer.insertAdjacentHTML(
                "beforeend",
                `
                <article class="drink">
                    <h3 id="drink-name">${drink.title}</h3>
                    <img src="${drink.image}" alt="" height="250px" width="250px">
                    <p id="drink-description">${drink.description}</p>
                    <button>Try It</button>
                </article>
                `
            );
        });
    })
    .then(() => {
        let addButtons = document.querySelectorAll('.drink > button')
        addButtons.forEach(addButton => {
            addButton.addEventListener('click', (event) => {       
                let drinkElement = event.target.parentElement.outerHTML
                console.log(drinkElement)
                cupholder.insertAdjacentHTML("beforeend", drinkElement)
                selectedDrinks.push(drinkElement)
                localStorage.setItem('history', JSON.stringify(selectedDrinks))              
            })
        })
    });
}

clearCupholderButton.addEventListener("click", () => {
    selectedDrinks = []
    cupholder.innerHTML = ''
    localStorage.setItem('history', JSON.stringify(selectedDrinks))              
})
        
hotButton.addEventListener("click", function () {
    displayDrinks("hot")
});

icedButton.addEventListener("click", function () {
    displayDrinks("iced")
});

displayDrinks("iced")
displayStoredDrinks()