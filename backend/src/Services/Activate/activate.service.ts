import { BadRequestException, Injectable } from '@nestjs/common';
import { Activate } from 'src/Entities/Activate/activate.entity';
import { ActivateRepository } from 'src/Repositories/Activate/activate.repository';
import { UsersService } from '../User/user.service';
import { EmailService } from '../email/email.service';



@Injectable()
export class ActivateService {
    constructor(private readonly activateRepository: ActivateRepository, private readonly userService: UsersService) {

    }

    async generate(activate: Activate) {

        const expiration = new Date(Date.now() + 10 * 60 * 1000);
        activate.expire = expiration;

        const code = String(Math.floor(100000 + Math.random() * 900000));
        activate.codeVerif = code;
        this.activateRepository.store(activate);

    }

    async readCodeVerif(code: any): Promise<{message: string}> {
        let findCodeVerif = await this.activateRepository.findByCodeVerif(code.code);

        let DateNow = new Date()
        /*

        */
        if (!findCodeVerif || findCodeVerif.expire <= DateNow) {
            throw new BadRequestException('votre code a été expiré !!')

        } 
            let userId = findCodeVerif.userId;
            let user = await this.userService.findById(userId)
            user.active = true;
            await this.userService.update(userId, {
                active: true
            });

            return { message: 'Votre compte a bien été activé ✅' }
    }
}
