import { firebaseAuth } from '@/plugins/firebase';
import { User } from '@firebase/auth-types';

export default ({ store }) => {
  return new Promise(resolve => {
    firebaseAuth.onAuthStateChanged((user: User) => {
      if (user) {
        store.dispatch('auth/authStateChange', user);
        return resolve();
      }
      return resolve();
    });
  });
};
