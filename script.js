dayjs.extend(dayjs_plugin_relativeTime);



const btnWatched = document.getElementById('btn-watched');
const btnWatching = document.getElementById('btn-watching');
const btnToWatch = document.getElementById('btn-towatch');

const cardWatched = document.getElementById('watched');
const cardWatching = document.getElementById('watching');
const cardToWatch = document.getElementById('to-watch');

const movieNameInput = document.getElementById('movie-name');
const movieCategoryInput = document.getElementById('movie-category');


// Ícones por categoria
const iconByCategory = {
  horror: 'fa-skull',
  action: 'fa-bolt',
  comedy: 'fa-face-laugh',
  drama: 'fa-masks-theater',
  romance: 'fa-heart',
  scifi: 'fa-robot',
  fantasy: 'fa-hat-wizard',
  thriller: 'fa-eye',
  mystery: 'fa-user-secret',
  crime: 'fa-gun',
  war: 'fa-helmet-battle',
  western: 'fa-hat-cowboy',
  animation: 'fa-wand-magic-sparkles',
  documentary: 'fa-camera',
  adventure: 'fa-compass'
};


function saveMovies() {
  const allMovies = {
    watched: getMoviesFromCard(cardWatched),
    watching: getMoviesFromCard(cardWatching),
    toWatch: getMoviesFromCard(cardToWatch)
  };
  
  localStorage.setItem('movies', JSON.stringify(allMovies));
}


function getMoviesFromCard(card) {
  const movies = [];
  const movieCards = card.querySelectorAll('.movie-card');
  
  movieCards.forEach(movieCard => {
    movies.push({
      name: movieCard.querySelector('h4').textContent,
      category: movieCard.querySelector('.movie-category').textContent,
      createdAt: movieCard.dataset.createdAt
    });
  });
  
  return movies;
}



function loadMovies() {
  const saved = localStorage.getItem('movies');
  
  if (!saved) return;
  
  const allMovies = JSON.parse(saved);
  

  allMovies.watched.forEach(movie => {
    const card = createMovieCard(movie.name, movie.category, movie.createdAt);
    cardWatched.append(card);
  });
  
  allMovies.watching.forEach(movie => {
    const card = createMovieCard(movie.name, movie.category, movie.createdAt);
    cardWatching.append(card);
  });
  
  allMovies.toWatch.forEach(movie => {
    const card = createMovieCard(movie.name, movie.category, movie.createdAt);
    cardToWatch.append(card);
  });
  
  enableDragAndDrop();
}


function createMovieCard(name, category, createdAt) {
  if (!name) return null;

  const timestamp = createdAt || new Date().toISOString();
  const newMovie = document.createElement('div');
  newMovie.classList.add('movie-card');
  newMovie.dataset.createdAt = timestamp;

  newMovie.innerHTML = `
    <div class="img"><i class="icon fa-solid fa-film"></i></div>
    <div class="content">
      <h4>${name.toUpperCase()}</h4>
      <p class="movie-category">${category.toUpperCase()}</p>
      <p class="created-time">added ${dayjs(timestamp).fromNow()}</p>
    </div>
    <button class="trash"></button>
  `;

  const iconEl = newMovie.querySelector('.icon');
  const iconClass = iconByCategory[category.toLowerCase()] || 'fa-film';
  iconEl.classList.replace('fa-film', iconClass);

  newMovie.querySelector('.trash').addEventListener('click', () => {
    newMovie.remove();
    saveMovies(); 
  });

  return newMovie;
}



function updateCreatedTimes() {
  document.querySelectorAll('[data-created-at]').forEach(movie => {
    const timeEl = movie.querySelector('.created-time');
    if (!timeEl) return;

    timeEl.textContent = `added ${dayjs(movie.dataset.createdAt).fromNow()}`;
  });
}


btnToWatch.addEventListener('click', () => {
  const name = movieNameInput.value.trim();
  const category = movieCategoryInput.value;
  
  if (!name) return; 
  
  const card = createMovieCard(name, category);
  if (!card) return;

  cardToWatch.append(card);
  enableDragAndDrop();
  
  movieNameInput.value = '';
  movieCategoryInput.value = '';
  
  saveMovies(); 
});

btnWatching.addEventListener('click', () => {
  const name = movieNameInput.value.trim();
  const category = movieCategoryInput.value;
  
  if (!name) return;
  
  const card = createMovieCard(name, category);
  if (!card) return;

  cardWatching.append(card);
  enableDragAndDrop();
  
  movieNameInput.value = '';
  movieCategoryInput.value = '';
  
  saveMovies();
});


btnWatched.addEventListener('click', () => {
  const name = movieNameInput.value.trim();
  const category = movieCategoryInput.value;
  
  if (!name) return;
  
  const card = createMovieCard(name, category);
  if (!card) return;

  cardWatched.append(card);
  enableDragAndDrop();
  
  movieNameInput.value = '';
  movieCategoryInput.value = '';
  
  saveMovies();
});



let sortableInstance = null;

function enableDragAndDrop() {
  const containers = document.querySelectorAll('.droppable');

  // Destrói a instância antiga se existir
  if (sortableInstance) {
    sortableInstance.destroy();
  }

  sortableInstance = new Draggable.Sortable(containers, {
    draggable: '.movie-card',
    mirror: {
      constrainDimensions: true,
    }
  });
  
  sortableInstance.on('sortable:stop', () => {
    saveMovies();
  });
}




const startBtn = document.getElementById('start-btn');
const splash = document.getElementById('splash');
const app = document.getElementById('app');

startBtn.addEventListener('click', () => {
  splash.classList.add('fade-out');

  setTimeout(() => {
    splash.style.display = 'none';
    app.classList.remove('hidden');
  }, 1000);
});




loadMovies();


updateCreatedTimes();
setInterval(updateCreatedTimes, 60000);


enableDragAndDrop();