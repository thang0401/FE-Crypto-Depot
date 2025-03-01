/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'client') return '/dashboard';
  else return '/login'
}


export default getHomeRoute
