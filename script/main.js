//меню

const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const tvShowsList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');


//открытие/закрытие меню

hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');    
    hamburger.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    if(!event.target.closest('.left-menu')){
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
});

leftMenu.addEventListener('click', event => {
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
    
    
});

//открытие модального окна

tvShowsList.addEventListener('click', event => {
    const target = event.target;
    const card = target.closest('.tv-card');

    if(card) {
        document.body.style.overflow = 'hidden';
        modal.classList.remove('hide');
    }
    console.log('card: ', card);
    
});

//закрытие модального окна

modal.addEventListener('click', event => {

    if(event.target.closest('.cross') ||
        event.target.classList.contains('modal')) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }

});

//смена карточки

// tvShowsList.addEventListener('mouseover', )
// tvShowsList.addEventListener('mouseout', )