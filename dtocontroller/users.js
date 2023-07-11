var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Type, Transform } from 'class-transformer';
export class usersDTO {
    constructor(ID, nom_user, email_user, emailVerifiedAt, estado_user, createdBy, updateBy, foto_user, pass_user, createdAt, updatedAt, deletedAt) {
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
    get nombreId() {
        return `${this.id} - ${this.nombre}`;
    }
}
__decorate([
    Expose({ name: 'id' }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], usersDTO.prototype, "id", void 0);
__decorate([
    Expose({ name: 'nombre' }),
    Type(() => String),
    __metadata("design:type", String)
], usersDTO.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'email' }),
    Type(() => String),
    __metadata("design:type", String)
], usersDTO.prototype, "email", void 0);
__decorate([
    Expose({ name: 'email_verified_at' }),
    __metadata("design:type", Date)
], usersDTO.prototype, "email_verified_at", void 0);
__decorate([
    Expose({ name: 'estado' }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], usersDTO.prototype, "estado", void 0);
__decorate([
    Expose({ name: 'created_by' }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], usersDTO.prototype, "created_by", void 0);
__decorate([
    Expose({ name: 'update_by' }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], usersDTO.prototype, "update_by", void 0);
__decorate([
    Expose({ name: 'foto' }),
    Type(() => String),
    __metadata("design:type", String)
], usersDTO.prototype, "foto", void 0);
__decorate([
    Expose({ name: 'password' }),
    Type(() => String),
    __metadata("design:type", String)
], usersDTO.prototype, "password", void 0);
__decorate([
    Expose({ name: 'created_at' }),
    Type(() => Date),
    __metadata("design:type", Date)
], usersDTO.prototype, "created_at", void 0);
__decorate([
    Expose({ name: 'updated_at' }),
    Type(() => Date),
    __metadata("design:type", Date)
], usersDTO.prototype, "updated_at", void 0);
__decorate([
    Expose({ name: 'deleted_at' }),
    Type(() => Date),
    __metadata("design:type", Date)
], usersDTO.prototype, "deleted_at", void 0);
