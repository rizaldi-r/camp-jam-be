"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEntityToDto = mapEntityToDto;
const class_transformer_1 = require("class-transformer");
function mapEntityToDto(dtoClass, entity) {
    const resultDto = (0, class_transformer_1.plainToInstance)(dtoClass, entity, {
        excludeExtraneousValues: true,
    });
    return resultDto;
}
//# sourceMappingURL=mapper.util.js.map