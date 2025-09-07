"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class ResourceNotFoundException extends common_1.NotFoundException {
    constructor(subject, indentifierType, indentifier, message = `${subject} with ${indentifierType} ${indentifier} not found.`) {
        super(message);
        this.name = ResourceNotFoundException.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ResourceNotFoundException = ResourceNotFoundException;
//# sourceMappingURL=custom-not-found.exception.js.map