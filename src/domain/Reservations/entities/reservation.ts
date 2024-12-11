export class Reservation {
    constructor(
        public id: string,
        public fechaInicio: Date,
        public fechaFin: Date,
        public clienteId: string,
        public habitacionId: string,
        public fechaReserva: Date
    ) {}
}
