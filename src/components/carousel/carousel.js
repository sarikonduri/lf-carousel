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

        // this.carouselWindow = document.createElement("div");

        // this.carouselWindow.classList.add("carousel-window");
        this.dots = document.createElement("div");
        this.dots.classList.add("dots");

        Array.from(this.element.children).forEach((child, index) => {
            const imageUrl = child.getAttribute("attr.image");

            const imageNode = document.createElement("img");

            imageNode.classList.add("carousel-item-image");
            imageNode.setAttribute("src", imageUrl);

            child.appendChild(imageNode);

            child.style.width = this.width + "px";

            // this.carouselWindow.appendChild(child);

            const dot = document.createElement("div");
            dot.classList.add("dot");
            dot.addEventListener("click", this.setItem.bind(this, index));

            this.dots.appendChild(dot);
        });



        // this.element.append(this.carouselWindow);

        //Add arrows
        const leftArrow = document.createElement("div");
        leftArrow.classList.add("left-arrow");
        leftArrow.addEventListener("click", this.setPrevItem.bind(this));

        const rightArrow = document.createElement("div");
        rightArrow.classList.add("right-arrow");
        rightArrow.addEventListener("click", this.setNextItem.bind(this));

        this.element.appendChild(leftArrow);
        this.element.appendChild(rightArrow);
        this.element.appendChild(this.dots);

        this.setItem(0);
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
        if(!this.disableClicks) {
            this.disableClicks = true;
            this.activeItem = index;

            let currentItem = index;
            let prevItem = index - 1;

            if (prevItem < 0) {
                prevItem = this.totalItems - 1;
            }

            this.element.children[currentItem].classList.add("move-next");

            setTimeout(() => {
                this.element.children[prevItem].classList.add("move-left");
                this.element.children[currentItem].classList.add("move-left");

                //after transition completes
                setTimeout(() => {
                    this.element.children[prevItem].classList.remove("move-left");
                    this.element.children[prevItem].classList.remove("active");

                    this.element.children[currentItem].classList.remove("move-left");
                    this.element.children[currentItem].classList.remove("move-next");

                    this.element.children[currentItem].classList.add("active");
                    this.disableClicks = false;
                }, 1000);
            }, 10);
            // this.carouselWindow.style.marginLeft = (- (this.width * this.activeItem)) + "px";

            this.setActiveItemDot();
        }
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