"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubmissionFieldDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_submission_field_dto_1 = require("./create-submission-field.dto");
class UpdateSubmissionFieldDto extends (0, mapped_types_1.PartialType)(create_submission_field_dto_1.CreateSubmissionFieldDto) {
}
exports.UpdateSubmissionFieldDto = UpdateSubmissionFieldDto;
//# sourceMappingURL=update-submission-field.dto.js.map