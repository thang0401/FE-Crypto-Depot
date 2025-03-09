/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'client') return '/myDashboard';
  else return '/login'
}


export default getHomeRoute
