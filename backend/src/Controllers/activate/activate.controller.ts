import { Body, Controller, Post, Req } from '@nestjs/common';
import { ActivateService } from 'src/Services/Activate/activate.service';

@Controller('activate')
export class ActivateController {
    
    constructor(private readonly activateService:ActivateService){

    }

    @Post()
    readCodeverif(@Body() code:any){
        return this.activateService.readCodeVerif(code);
        
    }
}