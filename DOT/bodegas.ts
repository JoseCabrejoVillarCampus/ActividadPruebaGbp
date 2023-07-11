import { Expose, Type, Transform } from 'class-transformer';

export class bodegasDTO {

    @Expose({ name: 'id' })
    @Transform(({ value, key }) => parseInt(value), { toClassOnly: true })
    id: number;

    @Expose({ name: 'nombre' })
    @Type(() => String)
    nombre: string;

    @Expose({ name: 'id_responsable' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    id_responsable: number;

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
        nom_user: string,
        responsableID: number,
        estado_user: number,
        createdBy: number,
        updateBy: number,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    ) {
        this.id = ID;
        this.nombre = nom_user;
        this.id_responsable = responsableID;
        this.estado = estado_user;
        this.created_by = createdBy;
        this.update_by = updateBy;
        this.created_at = createdAt;
        this.updated_at = updatedAt;
        this.deleted_at = deletedAt;
    }

    get nombreId(): string {
        return `${this.id} - ${this.nombre}`;
    }
}