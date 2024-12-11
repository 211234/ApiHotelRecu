export interface RoomDTO {
    id: string;
    numero: string;
    tipo: 'estándar' | 'suite' | 'deluxe';
    precio: number;
    disponibilidad: boolean;
}
