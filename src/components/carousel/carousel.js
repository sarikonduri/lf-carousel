const defaultConfig = {
    height: "200px",
};

export class Carousel {

    get width() {
        return this.element.offsetWidth + "px";
    }

    constructor(config) {
        this.config = Object.assign({}, defaultConfig, config);

        this.element = document.getElementById(this.config.id);

        this.setupCarousel();
        console.log(this.element);
    }

    setupCarousel() {
        this.element.classList.add("carousel");
        this.element.style.height = this.config.height;

        const carouselWindow = document.createElement("div");

        carouselWindow.classList.add("carousel-window");

        Array.from(this.element.children).forEach(child => {
            const imageUrl = child.getAttribute("attr.image");

            const imageNode = document.createElement("img");

            imageNode.classList.add("carousel-item-image");
            imageNode.setAttribute("src", imageUrl);

            child.appendChild(imageNode);

            child.style.width = this.width;

            carouselWindow.appendChild(child);
        });

        this.element.append(carouselWindow);
    }
}