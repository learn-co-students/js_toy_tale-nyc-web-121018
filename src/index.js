  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const newToy = document.querySelector('.add-toy-form')
      const toyURL = 'http://localhost:3000/toys'

  let addToy = false
  let allToys = []


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



    document.addEventListener("DOMContentLoaded", () => {

    const toyContainer = document.querySelector('#toy-collection')
    const toyCard = document.querySelector('.card')




    // which returns something called a promise. For now, just think of a promise as the the data we will eventually get back from the URL when the request is complete
    fetch(`${toyURL}`)
    .then( response => response.json() )
    .then( toyData => toyData.forEach(function(toy) {
      allToys = toyData
      toyContainer.innerHTML += `
      <div class="card">
        <h2>${toy.name}</h2>
       <img src= ${toy.image} class="toy-avatar"/>
        <p id="likes"> ${toy.likes} Likes </p>
        <button data-id="${toy.id}" class="like-btn" data-action="like"> Like <3 </button>
        <button data-id="${toy.id}" id="edit-${toy.id}" data-action="edit">Edit</button>
      </div>`
    })) // end of toyCard fetch



  // <button data-id="${toy.id}" id="delete-${toy.id}" data-action="delete">Delete</button>

    newToy.addEventListener('submit', (event) => {
      event.preventDefault()
      console.log(event.target)

      // grabbing keys from toy form and returning with value
      // selecting respective keys from toy form, and returning their value with .value
      //created ids in html
      let toyNameInput = newToy.querySelector('input#name').value
      console.log(toyNameInput)
      let toyImageInput = newToy.querySelector('input#image').value


// created to database
        fetch(`${toyURL}`, {
          method: 'POST',
          body: JSON.stringify({
            name: toyNameInput,
            image: toyImageInput,
            likes: 0,

        }),
          headers: {
             "Content-Type": "application/json",
              Accept: 'application/json'
          }
        })
// pessimistcally render to DOM - AUTOMATICALLY RENDER WHEN CREATE BUTTON IS CLICKED *****
        .then( response => response.json())
        .then( toy => {
          toyContainer.innerHTML += `
          <div class="card">
            <h2>${toy.name}</h2>
           <img src= ${toy.image} class="toy-avatar"/>
            <p> ${toy.likes} Likes </p>
            <button data-id="${toy.id}" class="like-btn" data-action="like"> Like <3 </button>
            <button data-id="${toy.id}" id="edit-${toy.id}" data-action="edit">Edit</button>
          </div>`

        })   //end POST
    })


  toyContainer.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'edit') {

      const editButton = document.querySelector(`#edit-${event.target.dataset.id}`)
        editButton.disabled = true

      const toyData = allToys.find((toy) => {
        return toy.id == event.target.dataset.id
      })
      console.log(toyData)
      // Load edit directly on toy card
      event.target.innerHTML += `

      <form id="toy-form">
          <input required id="edit-name" placeholder="${toyData.name}">
          <input required id="edit-image" placeholder="${toyData.image}">
      <input type="submit" value="Edit Toy">
   </div>`
    } else if (event.target.dataset.action === 'like') {
      console.log('you pressed like')
      let likeNum = event.target.previousElementSibling
       likeNum.innerText = parseInt(likeNum.innerText) + 1
       likeToy(event.target.dataset.id, parseInt(likeNum.innerText)).then(console.log)

    }

  }) // end event listener for editing and LIKING

// Add likes
  function likeToy(toyId, toyData) {
    // send a patch request to server increasing a toy's like count
    return fetch("http://localhost:3000/toys/" + toyId, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({likes: toyData})
    }).then(response => response.json())
  }


}); // end DOMContentLoaded
