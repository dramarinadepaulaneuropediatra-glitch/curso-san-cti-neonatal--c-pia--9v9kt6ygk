import { useSyncExternalStore } from 'react'

export type User = {
  id: string
  name: string
  email?: string
  role: 'staff' | 'admin'
  answers: Record<string, string>
  quizScore: number | null
  completedModules: number[]
}

export type AppState = {
  currentUser: User | null
  staffPassword: string
  users: User[]
}

const defaultState: AppState = {
  currentUser: null,
  staffPassword: 'hjk',
  users: [
    {
      id: 'admin',
      name: 'Dra Marina',
      email: 'dramarinadepaulaneuropediatra@gmail.com',
      role: 'admin',
      answers: {},
      quizScore: null,
      completedModules: [],
    },
  ],
}

const loadState = (): AppState => {
  try {
    const data = localStorage.getItem('san_app_state')
    return data ? JSON.parse(data) : defaultState
  } catch {
    return defaultState
  }
}

let state: AppState = loadState()
const listeners = new Set<() => void>()

const notify = () => {
  localStorage.setItem('san_app_state', JSON.stringify(state))
  listeners.forEach((l) => l())
}

export const appStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot() {
    return state
  },
  loginStaff(name: string, password: string): boolean {
    if (password === state.staffPassword) {
      let user = state.users.find(
        (u) => u.name.toLowerCase() === name.toLowerCase() && u.role === 'staff',
      )
      if (!user) {
        user = {
          id: Date.now().toString(),
          name,
          role: 'staff',
          answers: {},
          quizScore: null,
          completedModules: [],
        }
        state = { ...state, users: [...state.users, user], currentUser: user }
      } else {
        state = { ...state, currentUser: user }
      }
      notify()
      return true
    }
    return false
  },
  loginAdmin(email: string): boolean {
    if (email === 'dramarinadepaulaneuropediatra@gmail.com') {
      const admin = state.users.find((u) => u.email === email)
      if (admin) {
        state = { ...state, currentUser: admin }
        notify()
        return true
      }
    }
    return false
  },
  logout() {
    state = { ...state, currentUser: null }
    notify()
  },
  changePassword(newPassword: string) {
    state = { ...state, staffPassword: newPassword }
    notify()
  },
  saveAnswer(moduleId: string, answer: string) {
    if (state.currentUser) {
      const updatedUser = {
        ...state.currentUser,
        answers: { ...state.currentUser.answers, [moduleId]: answer },
      }
      state = {
        ...state,
        currentUser: updatedUser,
        users: state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
      }
      notify()
    }
  },
  saveQuizScore(score: number) {
    if (state.currentUser) {
      const updatedUser = { ...state.currentUser, quizScore: score }
      state = {
        ...state,
        currentUser: updatedUser,
        users: state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
      }
      notify()
    }
  },
  completeModule(id: number) {
    if (state.currentUser && !state.currentUser.completedModules.includes(id)) {
      const updatedUser = {
        ...state.currentUser,
        completedModules: [...state.currentUser.completedModules, id],
      }
      state = {
        ...state,
        currentUser: updatedUser,
        users: state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
      }
      notify()
    }
  },
}

export function useAppStore() {
  const storeState = useSyncExternalStore(appStore.subscribe, appStore.getSnapshot)
  return {
    ...storeState,
    loginStaff: appStore.loginStaff,
    loginAdmin: appStore.loginAdmin,
    logout: appStore.logout,
    changePassword: appStore.changePassword,
    saveAnswer: appStore.saveAnswer,
    saveQuizScore: appStore.saveQuizScore,
    completeModule: appStore.completeModule,
  }
}
