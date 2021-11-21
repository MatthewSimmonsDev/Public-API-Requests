const gallery = document.querySelector('#gallery');
gallery.innerHTML = '';

// fetch randomuser api
fetch('https://randomuser.me/api/?results=12')
.then(response => response.json())
.then(data => { 
  let userData = data.results;
  appendUsers(userData)
  modal(userData);
})
  
// creates the 12 users gallery 
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

// creates the modal window with all specifications
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
            <p class="modal-text">${data[i].email}</p>
            <p class="modal-text cap">${data[i].location.city}</p>
            <hr>
            <p class="modal-text">${formatPhone(data[i].cell)}</p>
            <p class="modal-text">${data[i].location.street.number} ${data[i].location.street.name}, ${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}</p>
            <p class="modal-text">Birthday: ${formatDate(data[i].dob.date)}</p>
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

// Helper function to format phone numbers
function formatPhone(phone) {
  //normalize string and remove all unnecessary characters
  phone = phone.replace(/[^\d]/g, "");

  //check if number length equals to 10
  if (phone.length == 10) {
      //reformat and return phone number
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }

  return 'incorrect phone number format';
}

// Helper function to format date
function formatDate(date){
  let myDate = new Date(date)
  let output = myDate.getDate() + "\\" +  (myDate.getMonth()+1) + "\\" + myDate.getFullYear();
  return output;
}