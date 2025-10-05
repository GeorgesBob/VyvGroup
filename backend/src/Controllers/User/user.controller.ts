import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Req } from "@nestjs/common";
import { Public } from "src/Decorator/public/public.decorator";
import { UsersService } from "src/Services/User/user.service";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UsersService) {}

    
    @Post()
    create(@Req() user) {
        return this.userService.create(user);
    }

    
    @Get()
    async findAll() {
        try {
            return await this.userService.findAll();
        } catch (error) {
            console.error(error); // log serveur
            throw new InternalServerErrorException('Impossible de récupérer les utilisateurs');
        }
    }

    @Patch(':id')
    update(@Param('id') id:number): string {
        return "this action modify user"
    }

    @Get('id/:id')
    findOne(@Param('id') id: number) {
      return "this action find one user";
    }
    
    @Public()
    @Get('firstname/:firstname')
    findByFirstName(@Param('firstname') firstname: string) {
      return this.userService.findByFirstName(firstname);
    }

    @Public()
    @Get('lastname/:lastname')
    findByLastName(@Param('lastname') lastname:string) {
        return this.userService.findByLastName(lastname);
    } 
    @Public()
    @Get('email/:email')
    findByEmail(@Body() body:any) {
        return this.userService.findByEmail(body.lastName);
    }


    @Delete(':id')
    DeleteOne(@Param('id') id:number): string {
        return "this action delete one user"
    }








}