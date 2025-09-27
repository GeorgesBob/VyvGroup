import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/Entities/User/user.entity';
import { UserRepository } from 'src/Repositories/Users/user.repository';
import { Activate } from 'src/Entities/Activate/activate.entity';
import { ActivateService } from '../Activate/activate.service';
import { EmailService } from '../email/email.service';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {

    constructor(private readonly userRepository: UserRepository, private readonly activateService: ActivateService, private readonly emailService: EmailService) {
        this.userRepository = userRepository;
    }


    async create(user: User): Promise<{message: string}>  {
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
            
            const  messageResponse = "Votre compte à bien été créer pour l'activer\n Veuilliez saisir votre code d'activation envoyer par email";
            
            return {message : messageResponse}
        } catch (error: any) {
            throw new BadRequestException("Veuillez retentez votre inscription élément manquant ou compte déjà crée");
        }
    }


}
