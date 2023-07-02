const mapping: Record<string, string> = {
  leagues: 'league',
  teams: 'team',
  'team-members': 'team_member',
  tournaments: 'tournament',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
