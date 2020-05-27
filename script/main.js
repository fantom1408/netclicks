
//меню

const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const tvShowsList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');


const DBService = class {
    getData = async (url) => {
        const res = await fetch(url);
        if (res.ok){
            return res.json();
        }else{
            throw new Error(`Не удалось получить данные по адресу ${url}`);
        }
        
        
    }

    getTestData = async () => {
        return await this.getData('test.json');
    }
}

const renderCard = response => {
    console.log(response);
    tvShowsList.textContent = '';

    response.results.forEach(item => {
        const card = document.createElement('li')
        card.className = 'tv-shows__item';
        card.innerHTML = `
        <a href="#" class="tv-card">
            <span class="tv-card__vote">6.4</span>
            <img class="tv-card__img"
                src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/xul6SG8rar3wkHPY8YusUtxcdlZ.jpg"
                data-backdrop="https://image.tmdb.org/t/p/w185_and_h278_bestv2/9eXNA3K010TlkUTLSzQ07cP6uPF.jpg"
                alt="Звёздные войны: Сопротивление">
            <h4 class="tv-card__head">Звёздные войны: Сопротивление</h4>
        </a>
        `;

        tvShowsList.append(card)

        console.log('card: ', card);
        
    });
}

new DBService().getTestData().then(renderCard);
// console.log(renderCard);


//открытие/закрытие меню

hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.left-menu')) {
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

    event.preventDefault();

    const target = event.target;
    const card = target.closest('.tv-card');

    if (card) {
        document.body.style.overflow = 'hidden';
        modal.classList.remove('hide');
    }
    console.log('card: ', card);

});

//закрытие модального окна

modal.addEventListener('click', event => {

    if (event.target.closest('.cross') ||
        event.target.classList.contains('modal')) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }

});

//смена карточки
const changeImage = event => {
    const card = event.target.closest('.tv-shows__item');
    if (card) {
        const img = card.querySelector('.tv-card__img');

                //можно сделать так

        if (img.dataset.backdrop) {
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
        }
            // а можно сделать так, написано ниже, выполняет тоже самое

        /*const changeImg = img.dataset.backdrop;
        if(changeImg) {
            img.dataset.backdrop = img.src;
            img.src = changeImg;
        }*/
    }

};

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);


