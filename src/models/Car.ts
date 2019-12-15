export default class Car {
    id: string;
    brand: string;
    model: string;
    plates: string;

    constructor(id: string, brand: string, model: string, plates: string) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.plates = plates;
    }
}
