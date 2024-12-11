export class Customer {
    constructor(
        public id: string,
        public nombre: string,
        public email: string,
        public telefono: string,
        public password: string,
        public fechaRegistro: Date
    ) {}
}
