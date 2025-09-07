"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyTransformerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const mapper_util_1 = require("../utils/mapper.util");
const user_response_body_dto_1 = require("../../user/dto/res/user-response-body.dto");
const courses_response_dto_1 = require("../../courses/dto/res/courses-response.dto");
const entollment_response_dto_1 = require("../../enrollments/dto/res/entollment-response.dto");
let BodyTransformerInterceptor = class BodyTransformerInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        let dtoClass;
        if (request.url.includes('/user')) {
            dtoClass = user_response_body_dto_1.UserResponseDto;
        }
        else if (request.url.includes('/courses')) {
            dtoClass = courses_response_dto_1.CourseResponseDto;
        }
        else if (request.url.includes('/enrollments')) {
            dtoClass = entollment_response_dto_1.EnrollmentResponseDto;
        }
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (!dtoClass || !data)
                return data;
            if (Array.isArray(data)) {
                return data.map((item) => (0, mapper_util_1.mapEntityToDto)(dtoClass, item));
            }
            else {
                return (0, mapper_util_1.mapEntityToDto)(dtoClass, data);
            }
        }));
    }
};
exports.BodyTransformerInterceptor = BodyTransformerInterceptor;
exports.BodyTransformerInterceptor = BodyTransformerInterceptor = __decorate([
    (0, common_1.Injectable)()
], BodyTransformerInterceptor);
//# sourceMappingURL=body-transformer.interceptor.js.map