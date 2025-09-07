"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubdescriptionsModule = void 0;
const common_1 = require("@nestjs/common");
const subdescriptions_service_1 = require("./subdescriptions.service");
const subdescriptions_controller_1 = require("./subdescriptions.controller");
const modules_module_1 = require("../modules/modules.module");
let SubdescriptionsModule = class SubdescriptionsModule {
};
exports.SubdescriptionsModule = SubdescriptionsModule;
exports.SubdescriptionsModule = SubdescriptionsModule = __decorate([
    (0, common_1.Module)({
        imports: [modules_module_1.ModulesModule],
        controllers: [subdescriptions_controller_1.SubdescriptionsController],
        providers: [subdescriptions_service_1.SubdescriptionsService],
    })
], SubdescriptionsModule);
//# sourceMappingURL=subdescriptions.module.js.map