export class Room {
    constructor(
        public id: string,
        public numero: string,
        public tipo: 'estándar' | 'suite' | 'deluxe',
        public precio: number,
        public disponibilidad: boolean
    ) {}
}
