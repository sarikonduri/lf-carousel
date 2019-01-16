import { Carousel } from "../components/carousel/carousel";

const config = {
    id: "lf-hero-carousel",
    height: window.innerWidth < 400 ? window.innerWidth : 400,
};

const carousel = new Carousel(config);