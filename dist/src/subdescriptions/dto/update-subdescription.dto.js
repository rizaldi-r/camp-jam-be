"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubdescriptionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_subdescription_dto_1 = require("./create-subdescription.dto");
class UpdateSubdescriptionDto extends (0, mapped_types_1.PartialType)(create_subdescription_dto_1.CreateSubdescriptionDto) {
}
exports.UpdateSubdescriptionDto = UpdateSubdescriptionDto;
//# sourceMappingURL=update-subdescription.dto.js.map