/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'client') return '/myDashboard';
  else return '/myDashboard'
}


export default getHomeRoute
