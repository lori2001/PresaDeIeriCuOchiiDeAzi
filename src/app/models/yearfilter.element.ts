export class YearFilterElement {
    ids: number[];
    year: string;
    used: boolean;

    constructor(ids: number[], year: string, used: boolean) {
        this.ids = ids;
        this.year = year;
        this.used = used;
    }
}
