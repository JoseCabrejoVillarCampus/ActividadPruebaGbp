var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
export class historialesDTO {
    constructor(ID, cant, bodegaOrigen, bodegaDestino, inventario, estado_user, createdBy, updateBy, createdAt, updatedAt, deletedAt) {
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
    get nombreId() {
        return `${this.id} - ${this.cantidad}`;
    }
}
__decorate([
    Expose({ name: 'id' }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], historialesDTO.prototype, "id", void 0);
__decorate([
    Expose({ name: 'cantidad' }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], historialesDTO.prototype, "cantidad", void 0);
__decorate([
    Expose({ name: 'id_bodega_origen' }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], historialesDTO.prototype, "id_bodega_origen", void 0);
__decorate([
    Expose({ name: 'id_bodega_destino' }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], historialesDTO.prototype, "id_bodega_destino", void 0);
__decorate([
    Expose({ name: 'id_inventario' }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], historialesDTO.prototype, "id_inventario", void 0);
__decorate([
    Expose({ name: 'estado' }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], historialesDTO.prototype, "estado", void 0);
__decorate([
    Expose({ name: 'created_by' }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], historialesDTO.prototype, "created_by", void 0);
__decorate([
    Expose({ name: 'update_by' }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], historialesDTO.prototype, "update_by", void 0);
__decorate([
    Expose({ name: 'created_at' }),
    __metadata("design:type", Date)
], historialesDTO.prototype, "created_at", void 0);
__decorate([
    Expose({ name: 'updated_at' }),
    __metadata("design:type", Date)
], historialesDTO.prototype, "updated_at", void 0);
__decorate([
    Expose({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], historialesDTO.prototype, "deleted_at", void 0);
