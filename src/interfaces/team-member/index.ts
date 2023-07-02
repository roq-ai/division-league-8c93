import { UserInterface } from 'interfaces/user';
import { TeamInterface } from 'interfaces/team';
import { GetQueryInterface } from 'interfaces';

export interface TeamMemberInterface {
  id?: string;
  user_id?: string;
  team_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  team?: TeamInterface;
  _count?: {};
}

export interface TeamMemberGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  team_id?: string;
}
