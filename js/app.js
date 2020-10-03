// Constructor Function UI

function UI() {};
// preloader
UI.prototype.hidePreloader = function () {
    document.querySelector('.preloader').style.display = 'none';
};
// navbar menu
UI.prototype.togglenavbar = function () {
    document.querySelector('.nav').classList.toggle('nav__show');
};
// navbar menu button
UI.prototype.toggleNavMenu = function () {
    const navBtn = document.querySelector('.navBtn');
    if (navBtn.children[0].classList.contains('fa-bars')) {
        navBtn.children[0].classList.remove('fa-bars');
        navBtn.children[0].classList.add('fa-times');
    } else {
        navBtn.children[0].classList.remove('fa-times');
        navBtn.children[0].classList.add('fa-bars');
    }
};
// Video Controller
UI.prototype.videoController = function () {
    let btn = document.querySelector('.video__switch-btn');
    if (!btn.classList.contains('onOffBtn')) {
        btn.classList.add('onOffBtn');
        document.querySelector('.video_item').pause()
    } else {
        btn.classList.remove('onOffBtn');
        document.querySelector('.video_item').play()
    }
};

// Form Submision

UI.prototype.submitForm = function () {
    let name = document.querySelector('.input-name').value;
    let lastName = document.querySelector('.input-lastname').value;
    let email = document.querySelector('.input-email').value;

    if (name === '' || lastName === '' || email === '') {
        this.showFeedback('Input Is Empty', 'error');
    } else {
        this.showFeedback('Customer Added To List', 'success');
        this.addCustomer(name, lastName, email);
    }
}

UI.prototype.showFeedback = function (text, attr) {
    let div = document.querySelector('.drink-form__feedback');
    div.textContent = text;
    div.classList.add(attr);
    setTimeout(() => {
        div.classList.remove(attr);
    }, 3000);
}

UI.prototype.addCustomer = function (name, lastName) {
    let arrOfImages = [0, 1, 2, 3, 4];
    let index = Math.floor(Math.random() * arrOfImages.length)
    let parent = document.querySelector('.drink-card__list');
    let div = document.createElement('div');
    div.classList.add('person');

    div.innerHTML = `<img src="./img/person-${index}.jpeg" alt="person" class="person__thumbnail">
    <h4 class="person__name">${name}</h4>
    <h4 class="person__last-name">${lastName}</h4>`;

    parent.appendChild(div);

    document.querySelector('.input-name').value = ''
    document.querySelector('.input-lastname').value = ''
    document.querySelector('.input-email').value = ''
}

UI.prototype.closeModal = function (e) {
    e.preventDefault();
    document.querySelector('.work-modal').classList.remove('work-modal__show');
}
// Constructor Function UI End

// Event Listener Function

function eventListeners() {
    let ui = new UI();
    document.querySelector('.navBtn').addEventListener('click', e => {
        ui.toggleNavMenu();
        ui.togglenavbar();
    });

    window.addEventListener('load', () => {
        ui.hidePreloader();
    });

    document.querySelector('.video__switch-container').addEventListener('click', e => {
        e.preventDefault();
        ui.videoController();
    });

    document.querySelector('.drink-form').addEventListener('submit', e => {
        e.preventDefault();
        ui.submitForm();
    });

    let workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            if (e.target.parentElement.classList.contains('work-item__icon')) {
                let id = e.target.parentElement.dataset.id;

                let modal = document.querySelector('.work-modal');

                modal.classList.add('work-modal__show');

                document.querySelector('.work-modal__item').style.background = `url('img/work-${id}.jpeg')center/cover`;
            }
        })
    });

    document.querySelector('.work-modal__close').addEventListener('click', e => {
        ui.closeModal(e);
    })

}

// Event Listener Function End

eventListeners();
