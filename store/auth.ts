import { User } from '@/types/user';
import { MutationTree, ActionTree } from 'vuex';
import { firebaseAuth, GoogleAuthProvider } from '@/plugins/firebase';
import firestore from '@/plugins/firestore';

interface State {
  loading: boolean;
  user: User;
}

export const state = (): State => ({
  loading: false,
  user: null
});

export const mutations: MutationTree<State> = {
  setLoading(state: State, loading: boolean): void {
    state.loading = loading;
  },
  setUser(state: State, user: User): void {
    state.user = user;
  }
};

export const actions: ActionTree<State, State> = {
  // https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action
  // async nuxtServerInit({ commit }, { req }) {
  //   const user = await firebaseAuth.currentUser;
  //   console.log('Server init user', user);
  //   commit('authStateChange', user)
  // },

  async authStateChange({ commit }, firebaseUser) {
    commit('setLoading', true);

    let user: User = {
      ...firebaseUser.providerData[0],
      emailVerified: firebaseUser.emailVerified,
      isAnonymous: firebaseUser.isAnonymous,
      uid: firebaseUser.uid
    };

    if (user && user.uid) {
      firestore
        .collection('users')
        .doc(user.uid)
        .set(user, { merge: true });

      const role = await firestore
        .collection('roles')
        .doc(user.uid)
        .get();

      if (role.exists) {
        user = { ...user, isAdmin: role.data().role === 'admin' };
      }
    }

    commit('setUser', user);
    commit('setLoading', false);
  },

  async signInWithGoogle() {
    await firebaseAuth.signInWithPopup(GoogleAuthProvider);
  },

  async signOut({ commit }) {
    await firebaseAuth.signOut();
    commit('setUser', null);
  }
};
