import { Expose, Type, Transform } from 'class-transformer';

export class productosDTO {

    @Expose({ name: 'id' })
    @Transform(({value})=>{if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message:`El dato id incumple los parametros acordados`};},{ toClassOnly: true})
    id: number;

    @Expose({ name: 'nombre' })
    @Transform(({value})=>{if(/^[a-z A-Z]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre incumple los parametros acordados`};},{ toClassOnly: true})
    nombre: string;

    @Expose({ name: 'descripcion' })
    @Type(() => String)
    descripcion: string;

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
    @Type(() => Date)
    created_at: Date;

    @Expose({ name: 'updated_at' })
    updated_at: Date;

    @Expose({ name: 'deleted_at' })
    deleted_at: Date;

    constructor(
        ID: number,
        nom_user: string,
        descript: string,
        estado_user: number,
        createdBy: number,
        updateBy: number,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    ) {
        this.id = ID;
        this.nombre = nom_user;
        this.descripcion = descript;
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