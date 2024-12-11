import { Request, Response } from 'express';
import { LoginService } from '../../../services/loginService';

export class LoginController {
    constructor(private loginService: LoginService) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const { token, role } = await this.loginService.login(email, password);

            res.status(200).json({ token, role });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }
}
