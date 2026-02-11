
// Day.js

dayjs.extend(dayjs_plugin_relativeTime);
dayjs.locale('pt-br');


// Seleção de botões e cards

const btnWatched = document.getElementById('btn-watched');
const btnWatching = document.getElementById('btn-watching');
const btnToWatch = document.getElementById('btn-towatch');

const cardWatched = document.getElementById('watched');
const cardWatching = document.getElementById('watching');
const cardToWatch = document.getElementById('to-watch');


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


// Criar card de filme

function createMovieCard(name, category) {
  if (!name) return null;

  const createdAt = new Date();
  const newMovie = document.createElement('div');

  // ADIÇÃO NECESSÁRIA PARA O DRAG !!!
  newMovie.classList.add('movie-card');

  newMovie.dataset.createdAt = createdAt.toISOString();

  newMovie.innerHTML = `
    <div class="img"><i class="icon fa-solid fa-film"></i></div>
    <div class="content">
      <h4>${name.toUpperCase()}</h4>
      <p class="movie-category">${category.toUpperCase()}</p>
      <p class="created-time">added ${dayjs(createdAt).fromNow()}</p>
    </div>
    <button class="trash"></button>
  `;

  // Ícone da categoria
  const iconEl = newMovie.querySelector('.icon');
  const iconClass = iconByCategory[category.toLowerCase()] || 'fa-film';
  iconEl.classList.replace('fa-film', iconClass);

  // Botão delete
  newMovie.querySelector('.trash').addEventListener('click', () => {
    newMovie.remove();
  });

  return newMovie;
}


// Atualizar tempos

function updateCreatedTimes() {
  document.querySelectorAll('[data-created-at]').forEach(movie => {
    const timeEl = movie.querySelector('.created-time');
    if (!timeEl) return;

    timeEl.textContent = `added ${dayjs(movie.dataset.createdAt).fromNow()}`;
  });
}


// Event listeners

btnToWatch.addEventListener('click', () => {
  const name = document.getElementById('movie-name').value;
  const category = document.getElementById('movie-category').value;
  const card = createMovieCard(name, category);
  if (!card) return;

  cardToWatch.append(card);
  enableDragAndDrop();

  document.getElementById('movie-name').value = '';
  document.getElementById('movie-category').value = '';
});

btnWatching.addEventListener('click', () => {
  const name = document.getElementById('movie-name').value;
  const category = document.getElementById('movie-category').value;
  const card = createMovieCard(name, category);
  if (!card) return;

  cardWatching.append(card);
  enableDragAndDrop();

  document.getElementById('movie-name').value = '';
  document.getElementById('movie-category').value = '';
});

btnWatched.addEventListener('click', () => {
  const name = document.getElementById('movie-name').value;
  const category = document.getElementById('movie-category').value;
  const card = createMovieCard(name, category);
  if (!card) return;

  cardWatched.append(card);
  enableDragAndDrop();

  document.getElementById('movie-name').value = '';
  document.getElementById('movie-category').value = '';
});


// Timer

updateCreatedTimes();
setInterval(updateCreatedTimes, 60000);


// DRAG & DROP (Shopify Draggable)

let sortableInstance = null;

function enableDragAndDrop() {
  const containers = document.querySelectorAll('.droppable');

  // destrói instância antiga
  if (sortableInstance) {
    sortableInstance.destroy();
  }

  sortableInstance = new Draggable.Sortable(containers, {
    draggable: '.movie-card',
    mirror: {
      constrainDimensions: true,
    }
  });
}

// inicializa (caso já existam cards)
enableDragAndDrop();




// PAGE ANIMATION


const startBtn = document.getElementById('start-btn')
const splash = document.getElementById('splash')
const app = document.getElementById('app')

startBtn.addEventListener('click', () => {
  splash.classList.add('fade-out')

  setTimeout(() => {
    splash.style.display = 'none'
    app.classList.remove('hidden')
  }, 1000) 
})
