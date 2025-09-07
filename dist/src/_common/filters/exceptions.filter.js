"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const custom_not_found_exception_1 = require("../exceptions/custom-not-found.exception");
let ExceptionsFilter = class ExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status;
        let message;
        let errorName;
        if (exception instanceof custom_not_found_exception_1.ResourceNotFoundException) {
            status = common_1.HttpStatus.NOT_FOUND;
            message = exception.message || 'not found.';
            errorName = exception.name;
        }
        else if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            }
            else if (typeof exceptionResponse === 'object' &&
                exceptionResponse !== null &&
                'message' in exceptionResponse) {
                message = exceptionResponse.message;
            }
            else {
                message = 'An unexpected HTTP error occurred.';
            }
            errorName = exception.name;
        }
        else if (exception instanceof Error) {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Internal server error.';
            errorName = exception.name || 'Error';
            console.error(`Unhandled error: ${exception.name} - ${exception.message}`, exception.stack);
        }
        else {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'An unknown error occurred.';
            errorName = 'UnknownError';
            console.error('An unknown exception type was caught:', exception);
        }
        response.status(status).json({
            statusCode: status,
            message,
            error: errorName,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};
exports.ExceptionsFilter = ExceptionsFilter;
exports.ExceptionsFilter = ExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], ExceptionsFilter);
//# sourceMappingURL=exceptions.filter.js.map