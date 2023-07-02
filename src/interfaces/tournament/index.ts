import { LeagueInterface } from 'interfaces/league';
import { GetQueryInterface } from 'interfaces';

export interface TournamentInterface {
  id?: string;
  name: string;
  league_id?: string;
  created_at?: any;
  updated_at?: any;

  league?: LeagueInterface;
  _count?: {};
}

export interface TournamentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  league_id?: string;
}
