const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let magic
let allToys = []



// YOUR CODE HERE

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


// OR HERE!

document.addEventListener('DOMContentLoaded', function(){
const toyCollection = document.querySelector('#toy-collection')
const addToyForm = document.querySelector('.add-toy-form')

function apiFetch() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(response => {
    allToys = response
    showToys(response)
  })

}

apiFetch()






//show toys function
function showToys(toys) {

  // console.log(toys);
  for(let toy of toys){
    // console.log(toy);=
    toyCollection.innerHTML +=
    `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`
  }

}
// ######


addToyForm.addEventListener('submit', function(event){
  event.preventDefault()
  let newName = event.target[0].value
  let newImgUrl = event.target[1].value

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"

    },
    body: JSON.stringify( {
  name: newName,
  image: newImgUrl,
  likes: 0
})
  })
  .then(function(response){
    // console.log(response.json());
    return response.json()
  }).then(
    function(toy){
      toyCollection.innerHTML +=
    `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`}

  )

})

toyCollection.addEventListener('click',function(event){
  // console.log(event.target.tagName);
  if (event.target.tagName === 'BUTTON') {
    console.log("you pressed a button!!!");
    toyName = event.target.parentElement.querySelector('h2').innerText
    for(let toy of allToys){
      if (toy.name === toyName){
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },

          body: JSON.stringify(
          {
            "likes": toy.likes +=1
          })
        }) // end of fetch
        .then(function(response){
          return response.json()
        }).then(function(response){


        })


      } //end of if
    }


  }
})


}) //end of dom content loaded
