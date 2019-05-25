import { User } from '@/types/user';
import { MutationTree, ActionTree } from 'vuex';
import { firebaseAuth, GoogleAuthProvider } from '@/plugins/firebase';

interface State {
  user: User;
}

export const state = (): State => ({
  user: null
});

export const mutations: MutationTree<State> = {
  setUser(state: State, user: User): void {
    state.user = user;
  }
};

export const actions: ActionTree<State, State> = {
  // https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action
  // nuxtServerInit({ commit }, context) {
  //   console.log('Root state serverInit', commit, context);
  // },

  authStateChange({ commit }, firebaseUser) {
    const user: User = {
      ...firebaseUser.providerData[0],
      emailVerified: firebaseUser.emailVerified,
      isAnonymous: firebaseUser.isAnonymous
    };
    commit('setUser', user);
  },

  async signInWithGoogle() {
    await firebaseAuth.signInWithPopup(GoogleAuthProvider);
  },

  async signOut({ commit }) {
    await firebaseAuth.signOut();
    commit('setUser', null);
  }
};
