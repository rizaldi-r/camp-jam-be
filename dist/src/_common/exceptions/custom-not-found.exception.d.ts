import { NotFoundException } from '@nestjs/common';
export declare class ResourceNotFoundException extends NotFoundException {
    constructor(subject: string, indentifierType: string, indentifier: number | string, message?: string);
}
