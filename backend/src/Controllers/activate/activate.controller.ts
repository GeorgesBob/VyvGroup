import { Body, Controller, Post, Req } from '@nestjs/common';
import { Public } from 'src/Decorator/public/public.decorator';
import { ActivateService } from 'src/Services/Activate/activate.service';

@Controller('activate')
export class ActivateController {
    
    constructor(private readonly activateService:ActivateService){

    }

   // @Public()
    @Post()
    readCodeverif(@Body() code:any){
        return this.activateService.readCodeVerif(code);
    }
}