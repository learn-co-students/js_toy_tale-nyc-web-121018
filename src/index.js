document.addEventListener("DOMContentLoaded", () => {

  const toyCollection = document.querySelector('#toy-collection')
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  let addToy = false
  let allToys = []

  getAllToys();

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
      toyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let toyName = e.target.name.value
        let toyImage = e.target.image.value

        fetch('http://localhost:3000/toys/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: toyName,
            image: toyImage,
            likes: 0
          })
        }) // end of fetch
        .then(resp => resp.json())
        .then(newToy => {
          allToys.push(newToy)
          return renderAllToys(allToys)
          // return getAllToys();
          // return toyCollection.innerHTML += renderToy(newToy)
        })
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

  toyCollection.addEventListener('click', (e) => {
    let likes = e.target.parentElement.querySelector("[data-name='likes']")

    if (e.target.className = 'like-btn') {
      let currentToyID = parseInt(e.target.dataset.id);
      console.log(currentToyID);
      let currentToy = allToys.find(toy => toy.id === currentToyID)
      // console.log(currentToy);
      let currentToyLikes = currentToy.likes
      // console.log('likes:', currentToyLikes++);

      fetch(`http://localhost:3000/toys/${currentToyID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: ++currentToyLikes
        })
      }) // end of fetch
      .then(resp => resp.json())
      .then(updatedToy => {
        // let updatedToyIndex = allToys.indexOf(currentToy) // alternate way
        let updatedToyIndex = allToys.findIndex(t => t.id === updatedToy.id)
        allToys[updatedToyIndex] = updatedToy
        console.log(updatedToy);
        return renderAllToys(allToys)
      })
    }
  }) // end of listener

  // helper functions
  function getAllToys() {
    fetch('http://localhost:3000/toys/')
    .then(resp => resp.json())
    .then(json => {
      allToys = json
      return renderAllToys(allToys)
    })
  }

  function renderAllToys(allToys) {
    return toyCollection.innerHTML = allToys.map(renderToy).join('')
    // return toyCollection.innerHTML = allToys.map(toy =>renderToy(toy)).join('')
  }

  function renderToy(toy) {
    return `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p data-name="likes">${toy.likes} Likes </p>
      <button data-id=${toy.id} class="like-btn">Like <3</button>
    </div>`
  }

}) // end of DOMContentLoaded
