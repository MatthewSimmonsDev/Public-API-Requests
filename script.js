const gallery = document.querySelector('#gallery');
gallery.innerHTML = '';

fetch('https://randomuser.me/api/?results=12')
.then(response => response.json())
.then(data => { 
  let userData = data.results;
  appendUsers(userData)
  modal(userData);
})
  
  
function appendUsers(data){
  for(let i = 0; i < data.length; i++){
  gallery.innerHTML += `
    <div class="card">
      <div class="card-img-container">
        <img class="card-img" src="${data[i].picture.medium}" alt="profile picture">
      </div>
      <div class="card-info-container">
      <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
      <p class="card-text">${data[i].email}</p>
      <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
      </div>
    </div>
  `
  }
  
}

function modal(data){
  for(let i = 0; i < data.length; i++){
    let users = document.querySelectorAll('.card')
    users[i].addEventListener('click', () =>{
      gallery.insertAdjacentHTML("beforeend", 
      `<div class="modal-container">
        <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
            <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
          </div>
        </div>
      </div>`
      )
      let modal = document.querySelector('.modal-close-btn');
      modal.addEventListener('click', () => {
        gallery.removeChild(document.querySelector('.modal-container'));
      })
    })

  }
}