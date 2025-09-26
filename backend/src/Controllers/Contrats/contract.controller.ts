import { Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

@Controller('contract')
export class ContractController {
    


    @Post()
    create(): string {
        return "this action create a contract"
    }

    @Patch(':id')
    update(@Param(':id') id : number) : string {
        return 'this action update a contract'
    }

    @Get()
    findAll():string {
        return 'find all contract'
    }

    @Get(':id')
    findOne(@Param(':id') id:number) :string {
        return ' find one contract'
    }

    @Delete(':id')
    deleteOne(@Param(':id') id: number): string {
        return 'delete contract'
    }




    

}