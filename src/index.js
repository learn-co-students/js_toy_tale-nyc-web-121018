document.addEventListener("DOMContentLoaded", () =>{

 const addBtn = document.querySelector('#new-toy-btn')

 const toyForm = document.querySelector('.container')
 let addToy = false


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


  const toyCollection = document.querySelector("#toy-collection")
  fetch("http://localhost:3000/toys")
      .then(r => r.json())
      .then(toys => {
        let toysHTML = toys.map(function(toy){
          return `
          <div class="card">
            <h2>${toy.name}</h2>
            <img src=${toy.image} class="toy-avatar" />
            <p>${toy.likes} Likes </p>
            <button data-id=${toy.id} class="like-btn">Like <3</button>
          </div>`
        })

        toyCollection.innerHTML = toysHTML.join('')

      })


      toyForm.addEventListener('submit', e => {
        e.preventDefault()
        let newToyName = e.target.name.value
        let newToyImage = e.target.image.value

        fetch("http://localhost:3000/toys", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: newToyName,
            image: newToyImage,
            likes: 0
          })

        })
        .then(r => r.json())
        .then(newToy => {
          let newToyHTML = `
          <div class="card">
            <h2>${newToy.name}</h2>
            <img src=${newToy.image} class="toy-avatar" />
            <p>${newToy.likes} Likes </p>
            <button data-id=${newToy.id} class="like-btn">Like <3</button>
          </div>`

           toyCollection.innerHTML += newToyHTML

          })
      })


          toyCollection.addEventListener('click', e => {

            if (e.target.className === "like-btn") {

            let currentLikes = parseInt(e.target.previousElementSibling.innerText)

            let newLikes = currentLikes + 1
            console.log(newLikes);
            e.target.previousElementSibling.innerText = newLikes + ' Likes';


            fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify ({
                likes: newLikes
              })

            })

          }


      })

}) //DOMContemt Loaded end
