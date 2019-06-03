
const newToyForm = document.querySelector(".add-toy-form")
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

let url = "http://localhost:3000/toys"

let allToys = []

const toyCollection = document.querySelector("#toy-collection")
const toyCard = toyCollection.querySelector("#card")

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener("DOMContentLoaded", function(event) {
// fetch all the toys into card

fetchToys()
addToy()
editToy()


function fetchToys(){
  fetch (url)
  .then ( r => r.json() )
  .then ( toys => toys.map (function (toy){
    allToys = toys
    let renderHTML = toyCollection.innerHTML +=
  ` <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn" data-id="${toy.id}">Like <3</button>
    <p>${toy.toys_sold} Remaining Toys</p>
    <button class="buy-btn" data-id="${toy.id}">$ Buy $</button>
    </div> `
    }))
} //end fetchToys()


// add toy to collection
  function addToy(){
    toyForm.addEventListener('submit', e => {
      e.preventDefault()
      const toyName = toyForm.querySelector("#name").value
      const toyURL = toyForm.querySelector("#image").value

        fetch (url, {
          method: "POST",
          body: JSON.stringify({
            name: toyName,
            image: toyURL,
            likes: 0,
            capacity: 20,
            toys_sold: 0,
          }),
          headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
    }) //fetch
    .then (r => r.json())
    .then ( toy => {
      toyCollection.innerHTML +=
    ` <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      <p>${toy.toys_sold} Remaining out of ${toy.capacity}</p>
      <button class="buy-btn">$ Buy $</button>
      </div> `

    })
  })
} // end addToy



  function editToy(){
    toyCollection.addEventListener('click', e=> {

      if (e.target.className === 'like-btn'){
        // console.log(e.target.previousElementSibling.innerText)
        let currentLikes = parseInt(e.target.previousElementSibling.innerText)
        let newLikes = currentLikes + 1
        console.log(newLikes)
        e.target.previousElementSibling.innerText = `${newLikes} Likes`
        // ADDED TO DOM
        //
        fetch(`http://localhost:3000/toys/${e.target.dataset.id}`,{
          method: "PATCH",
          headers:{
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          },
          body: JSON.stringify({
            likes: newLikes
            })
          })
      }
      // BUY BUTTON
      if (e.target.className === 'buy-btn'){
        let currentNum = parseInt(e.target.previousElementSibling.innerText)
        let updatedNum = currentNum - 1
        e.target.previousElementSibling.innerText = `${updatedNum} Remaining Toys`

        fetch(`http://localhost:3000/toys/${e.target.dataset.id}`,{
          method: "PATCH",
          headers:{
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          },
          body: JSON.stringify({
            toys_sold: updatedNum
            })
          })
      }
// if toys sold out
      if (e.target.className === 'buy-btn'){
        let currentNum = parseInt(e.target.previousElementSibling.innerText)
        if (currentNum >= 0){
          e.target.previousElementSibling.innerText = "Sold Out!"
          alert("Sold Out!")
        }
      }

    }) // end event listener

  }

}); // end DOMContentLoaded
