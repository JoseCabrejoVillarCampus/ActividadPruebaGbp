import { Expose, Type, Transform } from 'class-transformer';

export class historialesDTO {

    @Expose({ name: 'id' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    id: number;

    @Expose({ name: 'cantidad' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    cantidad: number;

    @Expose({ name: 'id_bodega_origen' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    id_bodega_origen: number;

    @Expose({ name: 'id_bodega_destino' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    id_bodega_destino: number;

    @Expose({ name: 'id_inventario' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    id_inventario: number;

    @Expose({ name: 'estado' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    estado: number;

    @Expose({ name: 'created_by' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    created_by: number;

    @Expose({ name: 'update_by' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    update_by: number;

    @Expose({ name: 'created_at' })
    created_at: Date;

    @Expose({ name: 'updated_at' })
    updated_at: Date;

    @Expose({ name: 'deleted_at' })
    deleted_at: Date;

    constructor(
        ID: number,
        cant: number,
        bodegaOrigen: number,
        bodegaDestino: number,
        inventario: number,
        estado_user: number,
        createdBy: number,
        updateBy: number,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    ) {
        this.id = ID;
        this.cantidad = cant;
        this.id_bodega_origen = bodegaOrigen;
        this.id_bodega_destino = bodegaDestino;
        this.id_inventario = inventario;
        this.estado = estado_user;
        this.created_by = createdBy;
        this.update_by = updateBy;
        this.created_at = createdAt;
        this.updated_at = updatedAt;
        this.deleted_at = deletedAt;
    }

    get nombreId(): string {
        return `${this.id} - ${this.cantidad}`;
    }
}