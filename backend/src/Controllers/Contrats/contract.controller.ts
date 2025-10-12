import { Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Roles } from "src/Decorator/roles/roles.decorator";
import { CreateContractDto } from "src/Dtos/ContractDto/create-contracts.dto";
import { UpdateContractDto } from "src/Dtos/ContractDto/update-contracts.dto";
import { Contract } from "src/Entities/Contracts/contract.entity";
import { RolesGuard } from "src/Guards/roles/roles.guard";
import { ContractService } from "src/Services/Contrats/contract/contract.service";

@Controller('contract')
export class ContractController {
    
    constructor(private readonly contractService: ContractService) {

    }
  
    @Post()
    create(body: CreateContractDto):Promise<{message:string}> {
        return this.contractService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id : number, body:UpdateContractDto) : Promise<Contract> {
        return this.contractService.udpateById(id, body);
    }

    @Get()
    findAll():Promise<Contract[]> {
        return this.contractService.findAll();
    }

    @Get('id/:id')
    findOne(@Param('id') id:number) :Promise<Contract> {
        return this.contractService.findById(id);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number): string {
        return 'delete contract'
    }




    

}