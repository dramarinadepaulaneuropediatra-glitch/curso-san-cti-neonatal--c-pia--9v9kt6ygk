import { useSyncExternalStore } from 'react'
import pb from '@/lib/pocketbase/client'

export type User = {
  id: string
  name: string
  email?: string
  role: 'staff' | 'admin'
  answers: Record<string, string>
  quizScore: number | null
  quizAttempts: number
  completedModules: number[]
}

export type AppState = {
  currentUser: User | null
  staffPassword: string
  users: User[]
  loading: boolean
}

const defaultState: AppState = {
  currentUser: null,
  staffPassword: 'hjk',
  users: [],
  loading: true,
}

let state: AppState = defaultState
const listeners = new Set<() => void>()

const notify = () => {
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
  async init() {
    try {
      const settings = await pb.collection('settings').getOne('singleton_settings1')
      state = { ...state, staffPassword: settings.staffPassword }
    } catch (e) {
      console.error('Settings not found or not created yet')
    }

    if (pb.authStore.isValid && pb.authStore.model) {
      state = {
        ...state,
        currentUser: {
          id: pb.authStore.model.id,
          name: pb.authStore.model.name || 'Admin',
          role: 'admin',
          answers: {},
          quizScore: null,
          quizAttempts: 0,
          completedModules: [],
        },
      }
    } else {
      const studentId = localStorage.getItem('san_student_id')
      if (studentId) {
        try {
          const student = await pb.collection('students').getOne(studentId)
          state = {
            ...state,
            currentUser: {
              id: student.id,
              name: student.name,
              role: 'staff',
              answers: student.answers || {},
              quizScore: typeof student.quizScore === 'number' ? student.quizScore : null,
              quizAttempts: student.quizAttempts || 0,
              completedModules: student.completedModules || [],
            },
          }
        } catch {
          localStorage.removeItem('san_student_id')
        }
      }
    }
    state = { ...state, loading: false }
    notify()
  },
  async fetchUsers() {
    try {
      const records = await pb.collection('students').getFullList({
        sort: '-created',
      })
      state = {
        ...state,
        users: records.map((r) => ({
          id: r.id,
          name: r.name,
          role: 'staff',
          answers: r.answers || {},
          quizScore: typeof r.quizScore === 'number' ? r.quizScore : null,
          quizAttempts: r.quizAttempts || 0,
          completedModules: r.completedModules || [],
        })),
      }
      notify()
    } catch {
      /* intentionally ignored */
    }
  },
  async loginStaff(name: string, password: string) {
    if (password === state.staffPassword) {
      try {
        const records = await pb.collection('students').getList(1, 1, {
          filter: `name = "${name}"`,
        })
        let student
        if (records.items.length > 0) {
          student = records.items[0]
        } else {
          student = await pb.collection('students').create({
            name,
            quizScore: null,
            quizAttempts: 0,
            completedModules: [],
            answers: {},
          })
        }
        localStorage.setItem('san_student_id', student.id)
        state = {
          ...state,
          currentUser: {
            id: student.id,
            name: student.name,
            role: 'staff',
            answers: student.answers || {},
            quizScore: typeof student.quizScore === 'number' ? student.quizScore : null,
            quizAttempts: student.quizAttempts || 0,
            completedModules: student.completedModules || [],
          },
        }
        notify()
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    }
    return false
  },
  async loginAdmin(email: string, password?: string) {
    try {
      await pb.collection('users').authWithPassword(email, password || '')
      await this.init()
      return true
    } catch (e) {
      return false
    }
  },
  logout() {
    pb.authStore.clear()
    localStorage.removeItem('san_student_id')
    state = { ...state, currentUser: null }
    notify()
  },
  async changePassword(newPassword: string) {
    try {
      await pb.collection('settings').update('singleton_settings1', { staffPassword: newPassword })
      state = { ...state, staffPassword: newPassword }
      notify()
    } catch (e) {
      console.error(e)
    }
  },
  async saveAnswer(moduleId: string, answer: string) {
    if (state.currentUser && state.currentUser.role === 'staff') {
      const answers = { ...state.currentUser.answers, [moduleId]: answer }
      try {
        await pb.collection('students').update(state.currentUser.id, { answers })
        state.currentUser.answers = answers
        notify()
      } catch {
        /* intentionally ignored */
      }
    }
  },
  async saveQuizScore(score: number) {
    if (state.currentUser && state.currentUser.role === 'staff') {
      const attempts = state.currentUser.quizAttempts + 1
      try {
        await pb.collection('students').update(state.currentUser.id, {
          quizScore: score,
          quizAttempts: attempts,
        })
        state.currentUser.quizScore = score
        state.currentUser.quizAttempts = attempts
        notify()
      } catch {
        /* intentionally ignored */
      }
    }
  },
  async completeModule(id: number) {
    if (
      state.currentUser &&
      state.currentUser.role === 'staff' &&
      !state.currentUser.completedModules.includes(id)
    ) {
      const modules = [...state.currentUser.completedModules, id]
      try {
        await pb.collection('students').update(state.currentUser.id, {
          completedModules: modules,
        })
        state.currentUser.completedModules = modules
        notify()
      } catch {
        /* intentionally ignored */
      }
    }
  },
}

appStore.init()

export function useAppStore() {
  const storeState = useSyncExternalStore(appStore.subscribe, appStore.getSnapshot)
  return {
    ...storeState,
    loginStaff: appStore.loginStaff.bind(appStore),
    loginAdmin: appStore.loginAdmin.bind(appStore),
    logout: appStore.logout.bind(appStore),
    changePassword: appStore.changePassword.bind(appStore),
    saveAnswer: appStore.saveAnswer.bind(appStore),
    saveQuizScore: appStore.saveQuizScore.bind(appStore),
    completeModule: appStore.completeModule.bind(appStore),
    fetchUsers: appStore.fetchUsers.bind(appStore),
  }
}
