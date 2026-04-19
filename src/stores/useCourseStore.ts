import { useAppStore } from './useAppStore'

export default function useCourseStore() {
  const { currentUser, completeModule } = useAppStore()
  return {
    completedModules: currentUser?.completedModules || [],
    completeModule,
  }
}
