import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    check(): {
        message: string;
    };
    refresh({ id }: {
        id: string;
    }): Promise<{
        accessToken: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        code: number;
        data: {
            id: string;
            username: string;
            email: string;
            tokens: {
                access_token: string;
                refresh_token: string;
            };
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout({ id }: {
        id: string;
    }): Promise<void>;
}
