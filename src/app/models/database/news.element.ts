export class NewsElement {
    id: number;

    name: string;
    href: string;
    description: string;

    category: string;
    language: string;

    noDay: boolean;
    noMonth: boolean;

    page: number;
    num: number;

    publish_date: string;
    keywords: string;

    constructor(id: number, name: string,
        href: string, description: string,
        category: string, language: string,
        noDay: boolean, noMonth: boolean,
        page: number, num: number, publish_date: string) {

        this.id = id;
        this.name = name;
        this.href = href;
        this.description = description;
        this.category = category;
        this.noDay = noDay;
        this.noMonth = noMonth;
        this.page = page;
        this.num = num;
        this.language = language;
        this.publish_date = publish_date;
    }
}
