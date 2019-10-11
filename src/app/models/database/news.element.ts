export class NewsElement {
    id: number;
    name: string;
    img: string;
    href: string;
    description: string;
    category: string;
    publish_date: string;

    constructor(id: number, name: string,
        img: string, href: string, description: string,
        category: string, publish_date: string) {

        this.id = id;
        this.name = name;
        this.img = img;
        this.href = href;
        this.description = description;
        this.category = category;
        this.publish_date = publish_date;
    }
}
