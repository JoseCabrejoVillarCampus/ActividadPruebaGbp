import { Expose, Type, Transform } from 'class-transformer';

export class usersDTO {
    @Expose({ name: 'id' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    id: number;

    @Expose({ name: 'nombre' })
    @Type(() => String)
    nombre: string;

    @Expose({ name: 'email' })
    @Type(() => String)
    email: string;

    @Expose({ name: 'email_verified_at' })
    email_verified_at: Date;

    @Expose({ name: 'estado' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    estado: number;

    @Expose({ name: 'created_by' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    created_by: number;

    @Expose({ name: 'update_by' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    update_by: number;

    @Expose({ name: 'foto' })
    @Type(() => String)
    foto: string;

    @Expose({ name: 'password' })
    @Type(() => String)
    password: string;

    @Expose({ name: 'created_at' })
    @Type(() => Date)
    created_at: Date;

    @Expose({ name: 'updated_at' })
    @Type(() => Date)
    updated_at: Date;

    @Expose({ name: 'deleted_at' })
    @Type(() => Date)
    deleted_at: Date;

    constructor(
        ID: number,
        nom_user: string,
        email_user: string,
        emailVerifiedAt: Date,
        estado_user: number,
        createdBy: number,
        updateBy: number,
        foto_user: string,
        pass_user: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    ) {
        this.id = ID;
        this.nombre = nom_user;
        this.email = email_user;
        this.email_verified_at = emailVerifiedAt;
        this.estado = estado_user;
        this.created_by = createdBy;
        this.update_by = updateBy;
        this.foto = foto_user;
        this.password = pass_user;
        this.created_at = createdAt;
        this.updated_at = updatedAt;
        this.deleted_at = deletedAt;
    }

    get nombreId(): string {
        return `${this.id} - ${this.nombre}`;
    }
}