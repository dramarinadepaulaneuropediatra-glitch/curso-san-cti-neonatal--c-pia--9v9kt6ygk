migrate(
  (app) => {
    const collection = new Collection({
      name: 'students',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'quizScore', type: 'number' },
        { name: 'quizAttempts', type: 'number' },
        { name: 'completedModules', type: 'json' },
        { name: 'answers', type: 'json' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('students')
    app.delete(collection)
  },
)
