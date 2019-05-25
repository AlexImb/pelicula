import { firebaseAuth } from '@/plugins/firebase';
import firestore from '@/plugins/firestore';
import { User } from '@firebase/auth-types';

export default async function({ redirect, route }) {
  try {
    const user: User = (await getCurrentUser(firebaseAuth)) as User;
    if (user == null && isAuthenticatedRoute(route)) redirect('/login');
    if (user != null && route.name === 'login') redirect('/overview');

    if (user && isAdminRoute(route)) {
      const isAdmin = await hasAdminRole(user);
      if (!isAdmin) redirect('/overview');
    }
  } catch (error) {
    redirect('/login');
  }
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

async function hasAdminRole(user) {
  if (!user.uid) return false;

  const role = await firestore
    .collection('roles')
    .doc(user.uid)
    .get();

  return role.exists && role.data().role === 'admin';
}

function getCurrentUser(firebaseAuth) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}
