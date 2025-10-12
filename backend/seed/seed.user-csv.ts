import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { User } from '../src/Entities/User/user.entity';
import { Contract } from '../src/Entities/Contracts/contract.entity';
 // adapte le chemin selon ton projet

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'VyvGroup',
    entities: [User, Contract],
    synchronize: true, // ⚠️ à désactiver en prod
});

async function seedFromCSV(filePath: string) {
    await AppDataSource.initialize();
    const userRepository = AppDataSource.getRepository(User);

    const results: any[] = [];

    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    for (const row of results) {
                        const user = new User();
                        user.firstName = row.firstName;
                        user.lastName = row.lastName;
                        user.birthDate = new Date(row.birthDate);
                        user.email = row.email;
                        user.password = row.password;
                        user.phoneNumber = row.phoneNumber;
                        user.statut = row.statut;

                        const exists = await userRepository.findOneBy({ email: user.email });
                        if (!exists) {
                            await userRepository.save(user);
                        }
                    }
                    console.log('Seeding terminé ✅');
                    await AppDataSource.destroy();
                    resolve();
                } catch (err) {
                    console.error('Erreur pendant le seed ❌', err);
                    reject(err);
                }
            });
    });
}

seedFromCSV('users.csv');
