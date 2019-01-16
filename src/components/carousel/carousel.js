export class Carousel {
    constructor(config) {
        this.config = config;
        this.element = document.getElementById(config.id);


        console.log(this.element);
    }

    setupCarousel() {
        this.element.classList.add("carousel")
    }
}