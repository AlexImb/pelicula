import { firebaseAuth } from '@/plugins/firebase';
import { User } from '@firebase/auth-types';

export default async ({ store }) => {
  await firebaseAuth.onAuthStateChanged(async (user: User) => {
    if (user) {
      await store.dispatch('auth/authStateChange', user);
    }
  });
};
