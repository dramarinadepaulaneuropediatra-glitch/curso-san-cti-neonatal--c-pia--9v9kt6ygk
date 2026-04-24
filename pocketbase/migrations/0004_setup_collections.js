migrate(
  (app) => {
    const quizAttempts = new Collection({
      name: 'quiz_attempts',
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
    app.save(quizAttempts)

    try {
      const settings = app.findCollectionByNameOrId('settings')
      settings.fields.add(new TextField({ name: 'shared_password' }))
      app.save(settings)

      const records = app.findRecordsByFilter('settings', '', '', 1, 0)
      if (records.length > 0) {
        records[0].set('shared_password', 'hjk')
        app.save(records[0])
      }
    } catch (e) {
      // collection settings not found or field already exists
    }
  },
  (app) => {
    try {
      const quizAttempts = app.findCollectionByNameOrId('quiz_attempts')
      app.delete(quizAttempts)
    } catch (e) {}
  },
)
