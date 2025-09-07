"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = exports.currentUserFactory = void 0;
const common_1 = require("@nestjs/common");
const currentUserFactory = (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
};
exports.currentUserFactory = currentUserFactory;
exports.CurrentUser = (0, common_1.createParamDecorator)(exports.currentUserFactory);
//# sourceMappingURL=current-user.decorator.js.map