"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const students_module_1 = require("./students/students.module");
const instructors_module_1 = require("./instructors/instructors.module");
const courses_module_1 = require("./courses/courses.module");
const categories_module_1 = require("./categories/categories.module");
const sections_module_1 = require("./sections/sections.module");
const modules_module_1 = require("./modules/modules.module");
const submission_templates_module_1 = require("./submission-templates/submission-templates.module");
const submissions_module_1 = require("./submissions/submissions.module");
const enrollments_module_1 = require("./enrollments/enrollments.module");
const module_progress_module_1 = require("./module-progress/module-progress.module");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const subdescriptions_module_1 = require("./subdescriptions/subdescriptions.module");
const links_module_1 = require("./links/links.module");
const submission_fields_module_1 = require("./submission-fields/submission-fields.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env`,
            }),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [
                    {
                        ttl: 60000,
                        limit: 50,
                    },
                ],
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            students_module_1.StudentsModule,
            students_module_1.StudentsModule,
            instructors_module_1.InstructorsModule,
            courses_module_1.CoursesModule,
            categories_module_1.CategoriesModule,
            sections_module_1.SectionsModule,
            modules_module_1.ModulesModule,
            submission_templates_module_1.SubmissionTemplatesModule,
            submissions_module_1.SubmissionsModule,
            enrollments_module_1.EnrollmentsModule,
            module_progress_module_1.ModuleProgressModule,
            subdescriptions_module_1.SubdescriptionsModule,
            links_module_1.LinksModule,
            submission_fields_module_1.SubmissionFieldsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map