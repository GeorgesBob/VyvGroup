import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContractDto } from 'src/Dtos/ContractDto/create-contracts.dto';
import { UpdateContractDto } from 'src/Dtos/ContractDto/update-contracts.dto';
import { Contract } from 'src/Entities/Contracts/contract.entity';
import { GarantieType } from 'src/Entities/Contracts/garanties';
import { ContractRepository } from 'src/Repositories/Contracts/contract.repository';

@Injectable()
export class ContractService {

    constructor(private readonly contractRepository: ContractRepository) {

    }

   async create(body:CreateContractDto) :Promise<{message: string}> {

        if(body === null) {
           throw new BadRequestException("Aucun élément n'a été envoyer");
        }

        let contract = await this.contractRepository.store(body)

        if(contract) {
            return { message : "contrat ajouté"};
        }
    }

    async findAll(): Promise<Contract[]> {
        return this.contractRepository.findAll();
    }

    async findById(id:number): Promise<Contract> {
        return this.contractRepository.findOneBy({idContract:id}); 
    }

    async findByTypeContract(typeContract: string) : Promise<Contract[]> {
        return  this.contractRepository.findBy({typeContrat:typeContract});
    }

    async findByDateDebut(dateDebut:Date) : Promise<Contract[]> {
        return  this.contractRepository.findBy({dateDebut:dateDebut});
    }

    async findByDateFin(dateFin:Date) : Promise<Contract[]> {
        return  this.contractRepository.findBy({dateFin:dateFin});
    }

    async findByGarantie(garantie:GarantieType) : Promise<Contract[]> {
        return  this.contractRepository.findBy({garantie:garantie});
    }

    async findByPrixMensuel(prixMensuel:string) : Promise<Contract[]> {
        return  this.contractRepository.findBy({prixMensuel:prixMensuel});
    }

    async udpateById(idContract:number,body:UpdateContractDto): Promise<Contract> {
       return this.contractRepository.updateOne(idContract, body);
    }
    
}
