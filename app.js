//==================select elements ==================

const menuBtn=document.querySelector('#menuBtn');
const bars=menuBtn.querySelectorAll('span');
const panel=document.querySelector('#panel');
const overlay=document.querySelector('#overlay');

const loading=document.querySelector('#loading');
const box=document.querySelector('#characters-box');

const searchBtn=document.getElementById('searchBtn');
const searchBar=document.getElementById('searchBar');
const filter=document.getElementById('filter');
const closeSearchBtn=document.getElementById('closeSearchBtn');
const noResult=document.getElementById('noResult');
const charactersSection=document.getElementById('characters');
const homeSection=document.getElementById('home')





//================== MOBILE MENU ==================

function openMenu(){
  panel.classList.remove('-right-72');
  panel.classList.add('right-0');
  overlay.classList.remove('hidden');

  //lines become X
  bars[0].classList.add('translate-y-2','rotate-45');
  bars[1].classList.add('opacity-0');
  bars[2].classList.add('-translate-y-2','-rotate-45');
}

function closeMenu(){
  panel.classList.remove('right-0');
  panel.classList.add('-right-72');
  overlay.classList.add('hidden');

  //X becomes lines again
  bars[0].classList.remove('translate-y-2','rotate-45');
  bars[1].classList.remove('opacity-0');
  bars[2].classList.remove('-translate-y-2','-rotate-45');
}

//hamburger click: if the panel is open close it, else open it
menuBtn.addEventListener('click',()=>{
  if(panel.classList.contains('right-0')){
    closeMenu();
  }else{
    openMenu();
  }
});

//close on overlay click and on link click
overlay.addEventListener('click',closeMenu);
panel.querySelectorAll('a').forEach((link)=>{
  link.addEventListener('click',closeMenu);
});

//================== ACTIVE LINK ==================

const activeLink=()=>{
  const sections=document.querySelectorAll('section');
  const navLinks=document.querySelectorAll('.navLink');

  let current='home';

  sections.forEach((section)=>{
    const sectionTop=section.offsetTop;
    if(window.scrollY >= sectionTop-150){
      current=section.getAttribute('id');
    }
  });

  navLinks.forEach((item)=>{
    item.classList.remove('text-yellow-400');
    if(item.getAttribute('href')==='#'+current){
      item.classList.add('text-yellow-400');
    }
  });
};

window.addEventListener('scroll',activeLink);
activeLink();

//============search ===========->

//search button open or close the search bar 
searchBtn.addEventListener('click',()=>{
  searchBar.classList.toggle('hidden');

  //if the bar is closed clear the text and show everything
  if (searchBar.classList.contains('hidden')){
    filter.value='';
    filterCards();
  }
});

//close button 
closeSearchBtn.addEventListener('click',()=>{
  filter.value='';
  filterCards();
  searchBar.classList.add('hidden');
});


filter.addEventListener('keyup',filterCards);

function filterCards(){
  //convert text to lowercase
  const text=filter.value.toLowerCase();
  const cards=document.querySelectorAll('.card');

  //convert to array
  Array.from(cards).forEach(function(card){
    const cardName =card.querySelector('h2').textContent;

    if (cardName.toLowerCase().indexOf(text)!=-1){
      card.style.display='flex';

    }else{
      card.style.display='none';
    }
  });

  //when searching hide home section 
  const searching=text.trim()!=='';
  homeSection.classList.toggle('hidden',searching);

  if(searching){
    window.scrollTo(0,0);
  }
}


//================== CHARACTERS ==================

//characters image->
const images={
  'Luke Skywalker':'https://cdn.artphotolimited.com/images/6718bf5f258c849397f6133d/1000x1000/star-wars-luke-skywalker-portrait.jpg',
  'C-3PO':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGSgkpdxcrvUVGtp5IjsedNPnCkrJ6Y4XiaAzERlI2BA&s=10',
  'R2-D2':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6xGr_NUAm6VI3ksrItSM1ZY5yVC7NdEzSWKaa_ojmlqFejRQf6idCEnE&s=10',
  'Darth Vader':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ui-eT8B98nkgPYGrAqs46dOpPPA3ox4fpWHLEuMt2A&s=10',
  'Leia Organa':'https://cdn.artphotolimited.com/images/6718bf5f258c849397f6133d/300x300/star-wars-princess-leia-organa.jpg',
  'Owen Lars':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABxbY6yKghj6DiIQ9gRJ9yYFj3uAeJHSAgLVOE0L9y-xqztuglKDa0Vo&s=10',
  'Beru Whitesun lars':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdH5tu8dWF3HbYWybt2eW_4G9l8q1tv0SZH8qU24YIVl2G6AjyxjZ-CmU8&s=10',
  'R5-D4':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWOf09toJozq1QEGH7vdRtXQklaW5ElTaRYpmT_EXx-ctWHSgBNXWD3tYV&s=10',
  'Biggs Darklighter':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbBPLVxjyKnOeoZPw5og3rpb2DuET5jIqq9evmIuiHvg&s=10',
  'Obi-Wan Kenobi':'https://static.wikia.nocookie.net/tgr-discord-server/images/5/54/Obi_Wan.jpg/revision/latest?cb=20210226192153'
};

const showLoading=()=>{
  loading.classList.remove('hidden');
  loading.classList.add('flex');
};

const hideLoading=()=>{
  loading.classList.add('hidden');
  loading.classList.remove('flex');
};

const getCharacters=async()=>{

  showLoading();

  try{

    const response=await fetch('https://swapi.dev/api/people');
    const data=await response.json();

    console.log(data.results);
    
    //before showing data the loading should be hidden
    hideLoading();

    data.results.forEach((person)=>{

      //image of the character (placeholder if there is no image)
      const imageURL=images[person.name] || 'https://placehold.co/400x400?text=No+Image';

      //create card
      const card=document.createElement('div');
      card.className='card bg-white rounded-xl shadow-md p-5 mt-8 flex flex-col gap-2 hover:shadow-xl transition border border-gray-200';

      //adding elements to card
      card.innerHTML=`
        <img class="w-full h-64 rounded-lg object-cover object-top" src="${imageURL}" alt="${person.name}">
        <h2 class="font-['IBM_Plex_Serif'] font-bold text-2xl tracking-wide text-gray-950">${person.name}</h2>
        <p class="text-gray-400 font-['Jost'] tracking-tighter">Height: ${person.height}</p>
        <p class="text-gray-400 font-['Jost'] tracking-tighter -mt-2">Mass: ${person.mass}</p>
        <button class="showFilmsBtn mt-6 hover:bg-yellow-500 text-yellow-400 hover:text-white font-medium border border-yellow-500 rounded-xl px-4 py-1">Show Films</button>
        <div class="filmsBody hidden max-h-40 overflow-y-auto pr-2 text-sm text-sky-700"></div>
        <button class="deleteBtn mt-auto hover:bg-rose-500 text-rose-400 hover:text-white font-medium border border-rose-500 rounded-xl py-1 px-4">Delete</button>
      `;

      //delete button of this card
      const deleteBtn=card.querySelector('.deleteBtn');
      deleteBtn.addEventListener('click',()=>{
        if(confirm('Are you sure?')){
          card.remove();
        }
      });

      const showFilmsBtn=card.querySelector('.showFilmsBtn');
      const filmsBody = card.querySelector('.filmsBody');

      showFilmsBtn.addEventListener('click',async()=>{
        //open or close
        filmsBody.classList.toggle('hidden');

        // if body has contet the film is loaded
        if (filmsBody.innerHTML) return;

        //loading
        filmsBody.textContent='loading...';

        try{
          let html ='';

          //get films one by one
          for (const url of person.films){
            const response = await fetch (url);
            const film = await response.json();

            html+=`
              <div class="py-2 border-b border-white/10">
                <p class ="font-bold text-yellow-600">${film.title}</p>
                <p>Episode : ${film.episode_id}</p>
                <p>Director: ${film.director}</p>
                <p>Release date: ${film.release_date}</p>
              </div>
            `;
          }

          //show films together
          filmsBody.innerHTML=html || 'no films found';

        }catch(error){
          console.error(error);
        }

      });

      box.appendChild(card);
    });

  }catch(error){
    hideLoading();
    console.error(error);
    box.innerHTML='<p class="text-rose-200 text-center col-span-full">Something went wrong. Try again.</p>';
  }
};

getCharacters();
