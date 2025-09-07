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
exports.ResourceOwnershipGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const client_1 = require("@prisma/client");
const ownership_decorator_1 = require("../decorators/ownership.decorator");
let ResourceOwnershipGuard = class ResourceOwnershipGuard {
    reflector;
    moduleRef;
    constructor(reflector, moduleRef) {
        this.reflector = reflector;
        this.moduleRef = moduleRef;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const allowAdminBypass = this.reflector.getAllAndOverride(ownership_decorator_1.ALLOW_ADMIN_BYPASS_OWNERSHIP_KEY, [context.getHandler(), context.getClass()]);
        const idSource = this.reflector.get(ownership_decorator_1.OWNERSHIP_ID_SOURCE_KEY, context.getHandler());
        if ((allowAdminBypass && user.role === client_1.UserRole.ADMIN) || !idSource) {
            return true;
        }
        const [userRoles, source, key] = idSource;
        const resourceId = request[source][key];
        if (!resourceId) {
            throw new common_1.BadRequestException(`Resource ID not found in request at ${String(source)}.${key}`);
        }
        const ownershipServiceType = this.reflector.getAllAndOverride(ownership_decorator_1.OWNERSHIP_SERVICE_KEY, [context.getHandler(), context.getClass()]);
        if (!ownershipServiceType) {
            throw new Error('OwnershipService is not defined for this endpoint. Use @OwnershipService()');
        }
        const ownershipService = this.moduleRef.get(ownershipServiceType, {
            strict: false,
        });
        for (const userRole of userRoles) {
            const methodName = `is${userRole.charAt(0).toUpperCase() + userRole.slice(1)}Owner`;
            if (typeof ownershipService[methodName] !== 'function') {
                throw new Error(`Method '${methodName}' not found on ownership service.`);
            }
            if (user[userRole]) {
                try {
                    const isOwner = await ownershipService[methodName](resourceId, user[userRole].id);
                    if (isOwner) {
                        return true;
                    }
                }
                catch (error) {
                    console.error(`Error during ownership check for role ${userRole}:`, error);
                }
            }
        }
        throw new common_1.ForbiddenException('You do not have permission to perform this action.');
    }
};
exports.ResourceOwnershipGuard = ResourceOwnershipGuard;
exports.ResourceOwnershipGuard = ResourceOwnershipGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        core_1.ModuleRef])
], ResourceOwnershipGuard);
//# sourceMappingURL=resource-ownership.guard.js.map