import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/Entities/User/user.entity';
import { UserRepository } from 'src/Repositories/Users/user.repository';
import { Activate } from 'src/Entities/Activate/activate.entity';
import { ActivateService } from '../Activate/activate.service';
import { EmailService } from '../email/email.service';
import { SignInDto } from 'src/Dtos/AuthDto/sign-in.dtos';
import { UsersService } from '../User/user.service';
import { JwtServices } from '../Jwt/jwt/jwt.service';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {

    constructor(private readonly userRepository: UserRepository, private readonly activateService: ActivateService, private readonly emailService: EmailService, private usersService: UsersService, private jwtService: JwtServices) {
        this.userRepository = userRepository;
    }


    async create(user: User): Promise<{ message: string }> {
        const activate = new Activate();
        try {

            // Hash du mot de passe
            user.password = await bcrypt.hash(user.password, 10);
            user.statut = 'adherent';

            // Insérer l'utilisateur en premier
            const insertResult = await this.userRepository.insert(user);
            const userId = insertResult.identifiers[0].idUser; // récupérer l'id généré

            // Créer l'objet Activate et le lier à l'utilisateur existant
            const activate = new Activate();
            activate.user = { idUser: userId } as User; // seulement l'id pour la relation

            this.activateService.generate(activate);

            // Si besoin d'envoyer l'email de vérification
            this.emailService.sendMailCodeVerif(activate);

            const messageResponse = "Votre compte à bien été créer pour l'activer\n Veuilliez saisir votre code d'activation envoyer par email";

            return { message: messageResponse }
        } catch (error: any) {
            throw new BadRequestException("Veuillez retentez votre inscription élément manquant ou compte déjà crée");
        }
    }

    async signIn(
       signInDto: SignInDto
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(signInDto.email);

        const match = await bcrypt.compare(signInDto.password, user.password);

        if (!match) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.idUser, email: user.email, roles: user.statut };
        return {
            access_token: await this.jwtService.generateToken(payload),
        };
    }


}
