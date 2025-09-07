"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnershipService = exports.OwnershipIdSource = exports.AllowAdminBypassOwnership = exports.OWNERSHIP_SERVICE_KEY = exports.OWNERSHIP_ID_SOURCE_KEY = exports.ALLOW_ADMIN_BYPASS_OWNERSHIP_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ALLOW_ADMIN_BYPASS_OWNERSHIP_KEY = 'allowAdminBypassOwnership';
exports.OWNERSHIP_ID_SOURCE_KEY = 'ownershipIdSource';
exports.OWNERSHIP_SERVICE_KEY = 'ownershipService';
const AllowAdminBypassOwnership = () => (0, common_1.SetMetadata)(exports.ALLOW_ADMIN_BYPASS_OWNERSHIP_KEY, true);
exports.AllowAdminBypassOwnership = AllowAdminBypassOwnership;
const OwnershipIdSource = (userRole, source, key) => (0, common_1.SetMetadata)(exports.OWNERSHIP_ID_SOURCE_KEY, [userRole, source, key]);
exports.OwnershipIdSource = OwnershipIdSource;
const OwnershipService = (service) => (0, common_1.SetMetadata)(exports.OWNERSHIP_SERVICE_KEY, service);
exports.OwnershipService = OwnershipService;
//# sourceMappingURL=ownership.decorator.js.map