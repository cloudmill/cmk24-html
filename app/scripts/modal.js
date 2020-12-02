const Modal = {
    open(modalID) {
        document.body.classList.add("no-scroll");
        document.querySelector(".modal").classList.add("modal--active");
        document.querySelector(`data--modalID=${modalID}`).classList.add("modal__item--active");
    },
    close() {
        document.body.classList.remove("no-scroll");
        document.querySelector(".modal").classList.add("modal--active");
        document.querySelector(".modal__item--active").classList.remove("modal__item--active");
    },
};
