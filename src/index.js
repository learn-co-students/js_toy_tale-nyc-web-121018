const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE





// OR HERE!

document.addEventListener("DOMContentLoaded", function(){
const toyCollection = document.querySelector("#toy-collection")

toyCollection.addEventListener("click", function(e){
  if(e.target.className === "like-btn"){
    let toyLikes = e.target.previousElementSibling
    console.log(parseInt(e.target.id))
    fetch(`http://localhost:3000/toys/${parseInt(e.target.id)}`, {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes" : `${parseInt(toyLikes.innerText) + 1}`
      })
    })
    //render pessimistically
    toyLikes.innerText = `${parseInt(toyLikes.innerText) + 1} Likes`
  }
})

fetch (`http://localhost:3000/toys`)
  .then(resp => resp.json())
  .then(parsed => renderAllToys(parsed))

function renderSingleToy(toy){
  toyCollection.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button id="${toy.id}-like-btn" class="like-btn">Like <3</button>
    </div>`
}


function renderAllToys(toys){
  toys.map(function(toy){
    renderSingleToy(toy)
  })
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    nameField = document.querySelector('input[name="name"]')
    imgField = document.querySelector('input[name="image"]')
    toyForm.addEventListener("submit", function(e){
      e.preventDefault()
      console.log(e.target, imgField.value, nameField.value)
      fetch(`http://localhost:3000/toys`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          Accept: "application/json"
        },
        body: JSON.stringify( {
          "name": nameField.value,
          "image": imgField.value,
          "likes": 0
        })
      })
      .then(resp => resp.json())
      .then(parsed => renderSingleToy(parsed))
    })
  } else {
    toyForm.style.display = 'none'
  }
})

})
