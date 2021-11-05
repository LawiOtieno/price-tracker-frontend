export class Product {
    id: number;
    title: string;
    currentPrice: string;
    productUrl: string;
    imgSrc: string;
    discount: number;
    datePosted: Date;

    constructor(id: number,name: string, current_price: string, link: string, image_url: string, discount: number, date_added: Date) {
        this.id = id;
        this.title = name;
        this.currentPrice = current_price;
        this.imgSrc = image_url;
        this.productUrl = link
        this.discount = discount;
        this.datePosted = date_added;
    }
}

