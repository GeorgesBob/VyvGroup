import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/Entities/User/user.entity';
import { UserRepository } from 'src/Repositories/Users/user.repository';
import { Activate } from 'src/Entities/Activate/activate.entity';
import { ActivateService } from '../Activate/activate.service';
import { EmailService } from '../email/email.service';
import { SignInDto } from 'src/Dtos/AuthDto/sign-in.dtos';
import { UsersService } from '../User/user.service';
import { JwtServices } from '../Jwt/jwt/jwt.service';
import { Jwt } from 'src/Entities/Jwt/jwt.entity';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {

    constructor(private readonly userRepository: UserRepository, private readonly activateService: ActivateService, private readonly emailService: EmailService, private usersService: UsersService, private jwtService: JwtServices) {
        this.userRepository = userRepository;
    }


    async create(user: User): Promise<{ message: string }> {
        const activate = new Activate()
        try {

            // Hash du mot de passe
            user.password = await bcrypt.hash(user.password, 10);

            // Insérer l'utilisateur en premier
            const insertResult = await this.userRepository.insert(user);
            const userId = insertResult.identifiers[0].idUser; // récupérer l'id généré

            // Créer l'objet Activate et le lier à l'utilisateur existant
            const activate = new Activate();
            activate.user = { idUser: userId } as User; // seulement l'id pour la relation

            this.activateService.generate(activate);

            // Si besoin d'envoyer l'email de vérification
            this.emailService.sendMailCodeVerif(activate);

            const messageResponse = "Votre compte à bien été créer pour l'activer \n Veuilliez saisir votre code d'activation envoyer par email";

            return { message: messageResponse }
        } catch (error: any) {
            throw new BadRequestException("Veuillez retentez votre inscription élément manquant ou compte déjà crée");
        }
    }

    async getBackCodeVerif(email:any) : Promise<{message: string}> {
        const emailUser = await this.userRepository.findOne({ where: { email: email } })
        if(emailUser.active != null) {
            throw new BadRequestException("compte déjà activé");
        }
            const activate = new Activate();
        
            activate.user = { idUser: emailUser.idUser } as User; // seulement l'id pour la relation

            this.activateService.generate(activate);
            this.emailService.sendMailCodeVerifAgain(email);

            return {message: "Nouveau de code de validation"}
    }

    async signIn(
       signInDto: SignInDto
    ): Promise<{ access_token: string, refresh_token:string }> {
        const user = await this.usersService.findByEmail(signInDto.email);

        const match = await bcrypt.compare(signInDto.password, user.password);

        if (!match) {
            throw new UnauthorizedException();
        }

        if(!user.active) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.idUser, email: user.email, roles: user.statut };
        const generateToken = await this.jwtService.generateToken(payload)
        const jwt = new Jwt();
        const expiration = new Date(Date.now() + 15 * 60 * 1000);
        jwt.token = generateToken.accessToken;
        jwt.refreshToken = generateToken.refreshToken;
        jwt.userId = payload.sub;
        jwt.expire = expiration;

        const findTokenByUserId = await this.jwtService.findOne(jwt.userId);

        
        const dateNow = new Date();
        
        

        if(!findTokenByUserId){
            await this.jwtService.insert(jwt);
        }

        if(!findTokenByUserId || findTokenByUserId.expire < dateNow) {
            if(findTokenByUserId !== null) {
                await this.jwtService.updateById(findTokenByUserId.userId,jwt);
            }
            
            return {
                access_token: generateToken.accessToken,
                refresh_token: generateToken.refreshToken
            };
        }


        return {
            access_token: findTokenByUserId.token,
            refresh_token: findTokenByUserId.refreshToken
        };
    }

    async signOut (idUser:string): Promise<void> {
        await this.jwtService.destroy(Number(idUser));
    }




}
