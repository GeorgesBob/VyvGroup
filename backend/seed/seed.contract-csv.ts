import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { User } from '../src/Entities/User/user.entity';
import { Contract } from '../src/Entities/Contracts/contract.entity';



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

async function seedContractsFromCSV(filePath: string) {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);
  const contractRepo = AppDataSource.getRepository(Contract);

  const results: any[] = [];

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          for (const row of results) {
            const user = await userRepo.findOneBy({ idUser: parseInt(row.userId) });
            if (!user) {
              console.warn(`⚠️ Aucun utilisateur trouvé pour userId=${row.userId}, contrat ignoré`);
              continue;
            }

            const contract = new Contract();
            contract.typeContrat = row.typeContrat;
            contract.dateDebut = new Date(row.dateDebut);
            contract.dateFin = new Date(row.dateFin);
            contract.garantie = row.garantie; // suppose que GarantieType = 'Bronze' | 'Argent' | 'Or'
            contract.prixMensuel = row.prixMensuel;
            contract.user = user;

            await contractRepo.save(contract);
          }
          console.log('✅ Contracts seeding terminé');
          await AppDataSource.destroy();
          resolve();
        } catch (err) {
          console.error('❌ Erreur pendant le seeding', err);
          reject(err);
        }
      });
  });
}

seedContractsFromCSV('contracts.csv');
