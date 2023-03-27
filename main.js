const animalList = document.getElementById('animal-list');

// Function to generate the list of clickable animal names
function renderAnimalList(animals) {
  animals.forEach(animal => {
    const listItem = document.createElement('li');
    listItem.id = `animal-${animal.id}`;
    listItem.innerText = animal.name;
    // adding the vote-count
    listItem.innerHTML += `<span class="vote-count">Votes: ${animal.votes}</span>`;
    listItem.addEventListener('click', () => {
      displayAnimalDetails(animal);
    });
    animalList.appendChild(listItem);
  });
}

async function fetchAnimals() {
   const response = await fetch('http://localhost:3000/characters'); 
   const data = await response.json();

   return data;
}

// Function to fetch the list of animals from the API and render the list of animals
async function renderAnimals() {
   const data = await this.fetchAnimals();
  renderAnimalList(data);
}

// Call the renderAnimals function to render the list of animals
renderAnimals()
  .catch(error => {
    console.error('Error:', error);
  });

const animalDetails = document.getElementById('animal-details');

// Function to display the animal details
function displayAnimalDetails(animal) {
  animalDetails.innerHTML = `
    <h2>${animal.name}</h2>
    <img src="${animal.image}" alt="${animal.name}">
    <button id="vote-button">Vote for ${animal.name}</button>
    <button id="reset-button">Reset for ${animal.name}</button>
  `;
  
  // Add event listener to vote button
  const voteButton = document.getElementById('vote-button');
  voteButton.addEventListener('click', () => {
    voteForAnimal(animal);
  });

//   reset event listener
  const resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', () => {
    resetForAnimal(animal);
  });

}

// Function to make an API request to vote for an animal
async function voteForAnimal(animal) {
  const response = await fetch(`http://localhost:3000/characters/${animal.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      votes: animal.votes + 1
    })
  });
  const data = await response.json();
  updateVoteCounts();
}

// reset single animal vote
async function resetForAnimal(animal) {
   const response = await fetch(`http://localhost:3000/characters/${animal.id}`, {
     method: 'PATCH',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       votes: 0
     })
   });
   const data = await response.json();
   updateVoteCounts();
 }

async function resetAnimalVotes() {
   const animalList = await fetchAnimals();
   for(const animal of animalList) {
      const response = await fetch(`http://localhost:3000/characters/${animal.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            votes: 0
         })
      });
      await response.json();
   }
   updateVoteCounts();
 }

// Function to update the vote count for an animal
function updateVoteCount(animal) {
  const listItem = document.getElementById(`animal-${animal.id}`);
  const voteCount = listItem.querySelector('.vote-count');
  voteCount.innerText = `Votes: ${animal.votes}`;
}
 
 // Function to update the vote count for all animals
 function updateVoteCounts() {
   fetch('http://localhost:3000/characters')
     .then(response => response.json())
     .then(data => {
       data.forEach(animal => {
         updateVoteCount(animal);
       });
     })
     .catch(error => {
       console.error('Error:', error);
     });
 }
