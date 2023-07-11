import { Expose, Type, Transform } from 'class-transformer';

export class inventariosDTO {
    
    @Expose({ name: 'id' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    id: number;

    @Expose({ name: 'id_bodega' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    id_bodega: number;

    @Expose({ name: 'id_producto' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    id_producto: number;

    @Expose({ name: 'cantidad' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    cantidad: number;

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
        bodegaID: number,
        productoID: number,
        cant: number,
        createdBy: number,
        updateBy: number,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    ) {
        this.id = ID;
        this.id_bodega = bodegaID;
        this.id_producto = productoID;
        this.cantidad = cant;
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