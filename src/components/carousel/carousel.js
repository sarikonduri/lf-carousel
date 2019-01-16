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
        this.dots = document.createElement("div");
        this.dots.classList.add("dots");

        Array.from(this.element.children).forEach((child, index) => {
            const imageUrl = child.getAttribute("attr.image");

            const imageNode = document.createElement("img");

            imageNode.classList.add("carousel-item-image");
            imageNode.setAttribute("src", imageUrl);

            child.appendChild(imageNode);

            child.style.width = this.width + "px";

            this.carouselWindow.appendChild(child);

            const dot = document.createElement("div");
            dot.classList.add("dot");
            dot.addEventListener("click", this.setItem.bind(this, index));

            this.dots.appendChild(dot);
        });



        this.element.append(this.carouselWindow);

        //Add arrows
        const leftArrow = document.createElement("div");
        leftArrow.classList.add("left-arrow");
        leftArrow.addEventListener("click", this.setPrevItem.bind(this));

        const rightArrow = document.createElement("div");
        rightArrow.classList.add("right-arrow");
        rightArrow.addEventListener("click", this.setNextItem.bind(this));

        this.element.append(leftArrow);
        this.element.append(rightArrow);
        this.element.append(this.dots);
    }

    registerCarouselTimer() {
        setInterval(this.setNextItem.bind(this), this.config.interval);
    }

    setNextItem() {
        let activeItem = this.activeItem;

        activeItem++;
        activeItem %= this.totalItems;

        this.setItem(activeItem);
    }

    setPrevItem() {
        let activeItem = this.activeItem;

        activeItem--;
        if(activeItem < 0) {
            activeItem = this.totalItems - 1;
        }

        this.setItem(activeItem);
    }

    setItem(index) {
        this.activeItem = index;
        this.carouselWindow.style.marginLeft = (- (this.width * this.activeItem)) + "px";

        this.setActiveItemDot();
    }

    setActiveItemDot() {
        Array.from(this.dots.children).forEach((dot, index) => {
            if(this.activeItem === index) {
                dot.style.backgroundColor = "rgba(255,255,255,0.5)";
            } else {
                dot.style.backgroundColor = "rgba(100,100,100,0.5)";
            }
        });
    }
}