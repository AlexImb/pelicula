export default function({ store, redirect, route }) {
  const user = store.state.auth.user;
  if (user != null && route.name === 'login') redirect('/overview');
  if (user == null && isAuthenticatedRoute(route)) redirect('/login');
}

function isAuthenticatedRoute(route) {
  return isAdminRoute(route) || isUserRoute(route);
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path === '/admin')) {
    return true;
  }
}

function isUserRoute(route) {
  return ['profile', 'overview'].includes(route.name);
}
