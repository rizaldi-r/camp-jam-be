"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const exceptions_filter_1 = require("./_common/filters/exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new exceptions_filter_1.ExceptionsFilter());
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'https://campjam.vercel.app',
            'https://final-project-fe-rizaldi-r.vercel.app',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map