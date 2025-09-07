"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const custom_not_found_exception_1 = require("../_common/exceptions/custom-not-found.exception");
const cateogories_repository_1 = require("./cateogories.repository");
let CategoriesService = class CategoriesService {
    categoriesRepository;
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async create(createDto) {
        return this.categoriesRepository.create(createDto);
    }
    async findAll(query) {
        return this.categoriesRepository.findAll(query);
    }
    async findOne(id) {
        const category = await this.categoriesRepository.findById(id);
        if (!category) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('Category', 'id', id);
        }
        return category;
    }
    async findByIdList(ids) {
        const categories = await this.categoriesRepository.findByIdList(ids);
        if (categories.length !== ids.length) {
            const foundIds = new Set(categories.map((c) => c.id));
            const notFoundIds = ids.filter((id) => !foundIds.has(id));
            throw new custom_not_found_exception_1.ResourceNotFoundException('Category', 'id', notFoundIds.join(', '));
        }
        return categories;
    }
    async update(id, updateDto) {
        const category = await this.categoriesRepository.findById(id);
        if (!category) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('Category', 'id', id);
        }
        return this.categoriesRepository.update(id, updateDto);
    }
    async remove(id) {
        const category = await this.categoriesRepository.findById(id);
        if (!category) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('Category', 'id', id);
        }
        return this.categoriesRepository.remove(id);
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cateogories_repository_1.CategoriesRepository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map