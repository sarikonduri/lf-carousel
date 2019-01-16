const defaultConfig = {
    height: "200",
    interval: 5000, //5seconds
};

export class Carousel {

    get width() {
        return this.element.offsetWidth;
    }

    constructor(config) {
        this.activeItem = 0;

        this.config = Object.assign({}, defaultConfig, config);

        this.element = document.getElementById(this.config.id);
        this.totalItems = this.element.children.length;

        this.setupCarousel();
        console.log(this.element);

        this.registerCarouselTimer();
    }

    setupCarousel() {
        this.element.classList.add("carousel");
        this.element.style.height = this.config.height + "px";

        this.carouselWindow = document.createElement("div");

        this.carouselWindow.classList.add("carousel-window");
        const dots = document.createElement("div");
        dots.classList.add("dots");

        Array.from(this.element.children).forEach(child => {
            const imageUrl = child.getAttribute("attr.image");

            const imageNode = document.createElement("img");

            imageNode.classList.add("carousel-item-image");
            imageNode.setAttribute("src", imageUrl);

            child.appendChild(imageNode);

            child.style.width = this.width + "px";

            this.carouselWindow.appendChild(child);

            const dot = document.createElement("div");
            dot.classList.add("dot");

            dots.appendChild(dot)
        });



        this.element.append(this.carouselWindow);

        //Add arrows
        const leftArrow = document.createElement("div");
        leftArrow.classList.add("left-arrow");

        const rightArrow = document.createElement("div");
        rightArrow.classList.add("right-arrow");



        // this.element.append(leftArrow);
        // this.element.append(rightArrow);
    }

    registerCarouselTimer() {
        setInterval(this.changeCarousel.bind(this), this.config.interval);
    }

    changeCarousel() {
        this.activeItem++;
        this.activeItem %= this.totalItems;

        this.setItem(this.activeItem);
    }

    setItem(index) {
        this.carouselWindow.style.marginLeft = (- (this.width * this.activeItem)) + "px";
    }
}