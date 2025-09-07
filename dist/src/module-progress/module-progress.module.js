"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleProgressModule = void 0;
const common_1 = require("@nestjs/common");
const module_progress_service_1 = require("./module-progress.service");
const module_progress_controller_1 = require("./module-progress.controller");
const module_progress_repository_1 = require("./module-progress.repository");
const enrollments_module_1 = require("../enrollments/enrollments.module");
const modules_module_1 = require("../modules/modules.module");
let ModuleProgressModule = class ModuleProgressModule {
};
exports.ModuleProgressModule = ModuleProgressModule;
exports.ModuleProgressModule = ModuleProgressModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => enrollments_module_1.EnrollmentsModule),
            (0, common_1.forwardRef)(() => modules_module_1.ModulesModule),
        ],
        controllers: [module_progress_controller_1.ModuleProgressController],
        providers: [module_progress_service_1.ModuleProgressService, module_progress_repository_1.ModuleProgressRepository],
        exports: [module_progress_service_1.ModuleProgressService, module_progress_repository_1.ModuleProgressRepository],
    })
], ModuleProgressModule);
//# sourceMappingURL=module-progress.module.js.map