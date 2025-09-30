import { BadRequestException, Injectable } from '@nestjs/common';
import { ActivateService } from '../Activate/activate.service';
import { Activate } from 'src/Entities/Activate/activate.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRepository } from 'src/Repositories/Users/user.repository';
import { ActivateRepository } from 'src/Repositories/Activate/activate.repository';

@Injectable()
export class EmailService {

    constructor(private readonly mailerService: MailerService, private activateRepository: ActivateRepository, private readonly userRepository: UserRepository) {

    }

    async sendMailCodeVerif(activate: Activate): Promise<void> {
        try {
            const emailUser = await this.userRepository.findOne({ where: { idUser: activate.user.idUser } })
            await this.mailerService.sendMail({
                to: emailUser.email,
                subject: 'Votre code de validation',
                // ou HTML
                html: `<p><b>Voici votre code : ${activate.codeVerif}, il expire dans 10 minutes </b></p>`,
            })
        } catch (error) {
            console.log(error);
        }

    }

    async sendMailCodeVerifAgain(email: any) {
        const emailUser = await this.userRepository.findOne({ where: { email: email } })
        const activate = await this.activateRepository.findOne({ where: { userId: emailUser.idUser } })

        await this.mailerService.sendMail({
            to: emailUser.email,
            subject: 'Votre code de validation',
            // ou HTML
            html: `<p><b>Voici votre code : ${activate.codeVerif}, il expire dans 10 minutes </b></p>`,
        })
    } catch(error) {
        console.log(error);
    }

}
