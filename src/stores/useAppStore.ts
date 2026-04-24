import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import pb from '@/lib/pocketbase/client'

export interface User {
  id: string
  name: string
  role: 'staff' | 'admin'
  quizScore: number | null
  quizAttempts: number
  completedModules: number[]
}

interface AppState {
  currentUser: User | null
  users: User[]
  staffPassword: string
  loginStaff: (name: string, password: string) => Promise<boolean>
  loginAdmin: (email: string, password: string) => Promise<boolean>
  logout: () => void
  fetchUsers: () => Promise<void>
  changePassword: (newPassword: string) => Promise<void>
  saveQuizScore: (score: number) => Promise<void>
  completeModule: (moduleId: number) => Promise<void>
}

const AppContext = createContext<AppState | null>(null)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [staffPassword, setStaffPassword] = useState('')

  const loginStaff = async (name: string, password: string) => {
    try {
      const settingsRecords = await pb.collection('settings').getFullList()
      const settings = settingsRecords[0]
      const validPassword = settings?.shared_password || settings?.staffPassword || 'hjk'

      if (password === validPassword) {
        let userRecord
        try {
          userRecord = await pb.collection('quiz_attempts').getFirstListItem(`name="${name}"`)
        } catch (e) {
          userRecord = await pb.collection('quiz_attempts').create({
            name,
            quizScore: null,
            quizAttempts: 0,
            completedModules: [],
          })
        }
        setCurrentUser({
          id: userRecord.id,
          name: userRecord.name,
          role: 'staff',
          quizScore: userRecord.quizScore,
          quizAttempts: userRecord.quizAttempts,
          completedModules: userRecord.completedModules || [],
        })
        return true
      }
    } catch (e) {
      console.error(e)
    }
    return false
  }

  const loginAdmin = async (email: string, password: string) => {
    try {
      await pb.collection('users').authWithPassword(email, password)
      const authRecord = pb.authStore.record
      if (authRecord) {
        setCurrentUser({
          id: authRecord.id,
          name: authRecord.name || 'Admin',
          role: 'admin',
          quizScore: null,
          quizAttempts: 0,
          completedModules: [],
        })
        return true
      }
    } catch (e) {
      console.error(e)
    }
    return false
  }

  const logout = () => {
    pb.authStore.clear()
    setCurrentUser(null)
  }

  const fetchUsers = useCallback(async () => {
    try {
      const records = await pb.collection('quiz_attempts').getFullList({ sort: '-created' })
      setUsers(
        records.map((r) => ({
          id: r.id,
          name: r.name,
          role: 'staff',
          quizScore: r.quizScore,
          quizAttempts: r.quizAttempts,
          completedModules: r.completedModules || [],
        })),
      )

      const settingsRecords = await pb.collection('settings').getFullList()
      if (settingsRecords.length > 0) {
        setStaffPassword(settingsRecords[0].shared_password || settingsRecords[0].staffPassword)
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const changePassword = async (newPassword: string) => {
    try {
      const settingsRecords = await pb.collection('settings').getFullList()
      if (settingsRecords.length > 0) {
        await pb.collection('settings').update(settingsRecords[0].id, {
          shared_password: newPassword,
          staffPassword: newPassword,
        })
        setStaffPassword(newPassword)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const saveQuizScore = async (score: number) => {
    if (!currentUser || currentUser.role !== 'staff') return
    try {
      const updated = await pb.collection('quiz_attempts').update(currentUser.id, {
        quizScore: score,
        quizAttempts: currentUser.quizAttempts + 1,
      })
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              quizScore: updated.quizScore,
              quizAttempts: updated.quizAttempts,
            }
          : null,
      )
    } catch (e) {
      console.error(e)
    }
  }

  const completeModule = async (moduleId: number) => {
    if (!currentUser || currentUser.role !== 'staff') return
    if (currentUser.completedModules.includes(moduleId)) return

    const newModules = [...currentUser.completedModules, moduleId]
    try {
      await pb.collection('quiz_attempts').update(currentUser.id, {
        completedModules: newModules,
      })
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              completedModules: newModules,
            }
          : null,
      )
    } catch (e) {
      console.error(e)
    }
  }

  return React.createElement(
    AppContext.Provider,
    {
      value: {
        currentUser,
        users,
        staffPassword,
        loginStaff,
        loginAdmin,
        logout,
        fetchUsers,
        changePassword,
        saveQuizScore,
        completeModule,
      },
    },
    children,
  )
}

export const useAppStore = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppStore must be used within AppProvider')
  return context
}

export default useAppStore
