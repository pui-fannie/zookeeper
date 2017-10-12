/*** Object Constructors ***/
function Cat(name) {
  this.name = name;
  this.image = "cat.jpg";
  this.type = "Cat";
}

function Dog(name) {
  this.name = name;
  this.image = "dog.jpg"
  this.type = "Dog";
}

function Bird(name) {
  this.name = name;
  this.image = "bird.jpg"
  this.type = "Bird";
}

/*** Global Variables ***/
var animals = [new Cat(), new Dog(), new Bird()];
var names = ["Toothless", "Marshmallow", "Momo", "Coco", "Ollie", "Oscar", "Bella", "Ruby", "Apples"];
var colors = ["AliceBlue", "Lavender", "LavenderBlush", "LightCyan", "MistyRose", "Aquamarine", "LightGreen", "PaleGreen", "Beige", "LemonChiffon"]

/*** Functions ***/
// get a random index for an array from 0 to maxIndex
function getRandomIndex(maxIndex) {
  return Math.floor(Math.random() * maxIndex);
}

// generates either a Cat, Dog, or Bird with a random name
function generateRandomAnimal() {
  var randomIdx = getRandomIndex(animals.length);
  var randomAnimal = animals[randomIdx];
  if (randomAnimal instanceof Cat) {
    return new Cat(generateRandomName());
  } else if (randomAnimal instanceof Dog) {
    return new Dog(generateRandomName());
  } else if (randomAnimal instanceof Bird) {
    return new Bird(generateRandomName());
  }
}

// generates a random name from list of names
function generateRandomName() {
  var randomIdx = getRandomIndex(names.length);
  return names[randomIdx];
}

// generates a random color from list of colors
function generateRandomColor() {
  var randomIdx = getRandomIndex(colors.length);
  return colors[randomIdx];
}

/*** Document Load ****/
$(document).ready(function() {
  // generate a random animal when the document opens
  var animal = JSON.parse(localStorage.getItem("savedAnimal"));
  var hasSavedAnimal = false;
  if (animal === null) {
    $("#button-storage").text("Save Animal");
    animal = generateRandomAnimal();
  } else {
    $("#button-storage").text("Clear Animal");
    hasSavedAnimal = true;
  }

  // update the page based on the animal properties
  $("#animal-name").text(animal.name + " the " + animal.type);
  $("#animal-img").attr("src", animal.image);

  // change page background to random color
  $("body").css("background-color", generateRandomColor());

  $("#button-storage").click(function() {
    if (hasSavedAnimal) {
      // clear the animal from the browser
      localStorage.removeItem("savedAnimal");
      // if this button was clicked, hide button and show feedback
      $("#button-storage").css("display", "none");
      $("#button-action-text").text("Cleared!");
      $("#button-action-text").css("display", "block");
    } else {
      // save the animal to the browser
      localStorage.setItem("savedAnimal", JSON.stringify(animal));
      // if this button was clicked, hide button and show feedback
      $("#button-storage").css("display", "none");
      $("#button-action-text").text("Saved!");
      $("#button-action-text").css("display", "block");
    }
  });
});