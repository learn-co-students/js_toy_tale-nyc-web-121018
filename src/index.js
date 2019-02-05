const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
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

  document.addEventListener("DOMContentLoaded", function(event) {
    const toyCollection = document.getElementById("toy-collection")
    const newToyForm = document.querySelector(".add-toy-form")
    const allToyCards = document.querySelectorAll(".card")

    function fetchToys() {
      fetch('http://localhost:3000/toys')
        .then(response => response.json())
        .then( data => {
          allToys = data
          showAllToys(allToys)
        })
    }
    fetchToys()

    function showAllToys(toys) {
      toyCollection.innerHTML = toys.map(createHTML).join("")
    }

    newToyForm.addEventListener('submit', e => {
      e.preventDefault()
      const name = e.target.name.value
      const image = e.target.image.value

      fetch("http://localhost:3000/toys", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          image: image,
          likes: 0
        })
      }).then(response => response.json())
        .then(toy => {
          allToys.push(toy)
          console.log(toy);
          toyCollection.innerHTML += createHTML(toy)
        })
    })

    toyCollection.addEventListener('click', e => {
      //1. find in array
      const toyObject = allToys.find(t => t.id === parseInt(e.target.dataset.id))
      const indexOfToy = allToys.indexOf(toyObject)
      let currentLikes = toyObject["likes"]
      currentLikes++
      console.log(currentLikes);


      // console.log(indexOfToy);
      //1.5. Fetch
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: currentLikes
        })
      })//fetch end

      allToys[indexOfToy]['likes'] = currentLikes
      showAllToys(allToys)
    })

  }); // end DOMContentLoaded


  function createHTML(toy) {
    return `<div class="card">
              <h2>${toy["name"]}</h2>
              <img src=${toy["image"]} class="toy-avatar" />
              <p>${toy["likes"]} Likes </p>
              <button class="like-btn" data-id="${toy["id"]}">Like <3</button>
            </div>`
  }
// OR HERE!
