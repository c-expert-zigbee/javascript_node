
/*jslint es6 */
"use strict";

const port = 8080;
const shoppingInput = document.querySelector(".shopping-input");
const shoppingButton = document.querySelector(".shopping-button");
const shoppingList = document.querySelector(".shopping-list");
const filterOption = document.querySelector(".filter-shoppingitems");

//addition of Event Listeners
document.addEventListener("DOMContentLoaded", getShoppings);
shoppingButton.addEventListener("click", addshopping);
shoppingList.addEventListener("click", deleteShopping);
filterOption.addEventListener("click", filterShopping);

//Functions

function addshopping(e) {
  //Prevent natural behaviour i.e stops page refreshing when trying
  //to add an item
  "use strict";
  e.preventDefault();
  //Create shopping div
  const shoppingDiv = document.createElement("div");
  shoppingDiv.classList.add("shopping");
  //Create list
  const newShopping = document.createElement("li");
  newShopping.innerText = shoppingInput.value;
  //Save to local database
  saveLocalShoppings(shoppingInput.value);
  newShopping.classList.add("shopping-item");
  shoppingDiv.appendChild(newShopping);
  shoppingInput.value = ""; //clears the input box of text  after each addition
  //Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  shoppingDiv.appendChild(completedButton);
  //Create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  trashButton.classList.add("trash-btn");
  shoppingDiv.appendChild(trashButton);
  //attach final Shopping
  shoppingList.appendChild(shoppingDiv);
}

//deleting function
function deleteShopping(e) {
  "use strict";
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const shopping = item.parentElement;
    shopping.classList.add("fall");
    //at the end of the transition remove item from database
    removeLocalShoppings(shopping);
    shopping.addEventListener("transitionend", e => {
    shopping.remove();
    });
  }
  //check removal process works
  if (item.classList[0] === "complete-btn") {
    const shopping = item.parentElement;
    shopping.classList.toggle("completed");
    console.log(shopping);
  }
}
//create filter system
function filterShopping(e) {
  const shoppings = shoppingList.childNodes;
  shoppings.forEach(function(shopping) {
    switch (e.target.value) {
      // all or latest, i.e reverse chronological order
      case "all":
        shopping.style.display = "flex";
        break;
      //completed, i.e. items added to basket
      case "completed":
        if (shopping.classList.contains("completed")) {
          shopping.style.display = "flex";
        } else {
          shopping.style.display = "none";
        }
        break;
      //uncompleted, i.e. items not added to basket yet
      case "uncompleted":
        if (!shopping.classList.contains("completed")) {
          shopping.style.display = "flex";
        } else {
          shopping.style.display = "none";
        }
    }
  });
}
//exchanging data using json - saving
function saveLocalShoppings(shopping) {
  let shoppings;
  if (localStorage.getItem("shoppings") === null) {
    shoppings = [];
  } else {
    shoppings = JSON.parse(localStorage.getItem("shoppings"));
  }
  shoppings.push(shopping);
  localStorage.setItem("shoppings", JSON.stringify(shoppings));
}
//exchanging data using json - removing
function removeLocalShoppings(shopping) {
  let shoppings;
  if (localStorage.getItem("shoppings") === null) {
    shoppings = [];
  } else {
    shoppings = JSON.parse(localStorage.getItem("shoppings"));
  }
  const shoppingIndex = shopping.children[0].innerText;
  shoppings.splice(shoppings.indexOf(shoppingIndex), 1);
  localStorage.setItem("shoppings", JSON.stringify(shoppings));
}

function getShoppings() {
  let shoppings;
  if (localStorage.getItem("shoppings") === null) {
    shoppings = [];
  } else {
    shoppings = JSON.parse(localStorage.getItem("shoppings"));
  }
  shoppings.forEach(function(shopping) {
    //Create shopping div
    const shoppingDiv = document.createElement("div");
    shoppingDiv.classList.add("shopping");
    //Create list
    const newShopping = document.createElement("li");
    newShopping.innerText = shopping;
    newShopping.classList.add("shopping-item");
    shoppingDiv.appendChild(newShopping);
    shoppingInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    shoppingDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    shoppingDiv.appendChild(trashButton);
    //attach final Shopping
    shoppingList.appendChild(shoppingDiv);
  });
}