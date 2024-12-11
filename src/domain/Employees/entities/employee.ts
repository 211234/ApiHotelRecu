export class Employee {
    constructor(
        public id: string,
        public nombre: string,
        public email: string,
        public  password: string,
        public cargo: 'recepcionista' | 'limpieza' | 'seguridad' | 'mantenimiento',
        public horarioEntrada: string,
        public horarioSalida: string,
        public fechaContratacion: Date
    ) {}
}
