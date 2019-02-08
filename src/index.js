const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyURL = `http://localhost:3000/toys`

document.addEventListener("DOMContentLoaded", function(event) {

  const toyCollection = document.querySelector("#toy-collection")
  fetch(toyURL)
    .then(r => r.json())
    .then(toys => {
      let toysHTML = toys.map(toy => {
        return `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button data-id="${toy.id}" class="like-btn">Like <3</button>
          <button data-id="${toy.id}" class="delete-btn">back in the toy chest</button>
        </div>
        `
      })
      toyCollection.innerHTML = toysHTML.join('')
    })

  toyForm.addEventListener("submit", e => {
    e.preventDefault()
    // console.log(e.target.name)

    const toyName = e.target.name.value
    const toyImage = e.target.image.value

    fetch(toyURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 99
      })
    })
    .then( r => r.json())
    .then( newToy => {

      let newToyHTML = `
        <div class="card">
          <h2>${newToy.name}</h2>
          <img src=${newToy.image} class="toy-avatar" />
          <p>${newToy.likes} Likes </p>
          <button data-id="${newToy.id}" class="like-btn">Like <3</button>
          <button data-id="${newToy.id}" class="delete-btn">back in the toy chest</button>
        </div>
      `

     toyCollection.innerHTML += newToyHTML
      // console.log(e.target.reset())
    })

  })

  toyCollection.addEventListener("click", (e) => {
    if (e.target.className === "like-btn"){

      let currentLikes = parseInt(e.target.previousElementSibling.innerText)
      let newLikes = currentLikes + 1
      e.target.previousElementSibling.innerText = newLikes + " likes"

      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })
    }

    if (e.target.className === "delete-btn"){
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "DELETE"
      })
      .then(r => {
        e.target.parentElement.remove()
      })
    }
  })


  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })



})
