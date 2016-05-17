export class PaletteService {
    colors:Array<string>;

    constructor() {
        this.colors = ['#FFFFFF',
            '#F8F8F8',
            '#FFFFF7',
            '#C2E0F4',
            '#85C1E9',
            '#3498DB',
            '#4589B0',
            '#1A4C6D',
            '#0F3057',
            '#232C3D',
            '#050F15'];
    }

    get pallete() {
        return this.colors;
    }
}

