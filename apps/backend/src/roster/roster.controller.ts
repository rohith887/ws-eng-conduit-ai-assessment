import { Controller, Get } from '@nestjs/common';
import { RosterService } from './roster.service';
import { RosterDto } from './dto/roster.dto';

@Controller('api/roster')
export class RosterController {
  constructor(private readonly rosterService: RosterService) {}

  @Get()
  async getRoster(): Promise<RosterDto[]> {
    return this.rosterService.getRoster();
  }
}
