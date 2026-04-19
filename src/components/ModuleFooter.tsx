import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useCourseStore from '@/stores/useCourseStore'
import { useEffect } from 'react'

interface ModuleFooterProps {
  prev?: string
  next?: string
  moduleId: number
}

export function ModuleFooter({ prev, next, moduleId }: ModuleFooterProps) {
  const { completeModule } = useCourseStore()

  useEffect(() => {
    // Automatically mark as complete when reaching the bottom of the module
    completeModule(moduleId)
  }, [moduleId, completeModule])

  return (
    <div className="flex items-center justify-between mt-12 pt-6 border-t pb-8">
      {prev ? (
        <Link to={prev}>
          <Button variant="outline" className="group">
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Anterior
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link to={next}>
          <Button className="group bg-primary hover:bg-primary/90 text-white">
            Próximo Módulo
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      ) : (
        <Link to="/">
          <Button variant="secondary">Concluir Curso</Button>
        </Link>
      )}
    </div>
  )
}
