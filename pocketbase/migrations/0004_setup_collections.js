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

    if (app.hasTable('settings')) {
      try {
        const settings = app.findCollectionByNameOrId('settings')
        if (!settings.fields.getByName('shared_password')) {
          settings.fields.add(new TextField({ name: 'shared_password' }))
          app.save(settings)
        }

        const records = app.findRecordsByFilter('settings', '', '', 1, 0)
        if (records.length > 0) {
          records[0].set('shared_password', 'hjk')
          app.save(records[0])
        }
      } catch (e) {
        // ignore
      }
    } else {
      try {
        const settings = new Collection({
          name: 'settings',
          type: 'base',
          listRule: '',
          viewRule: '',
          createRule: null,
          updateRule: null,
          deleteRule: null,
          fields: [
            { name: 'shared_password', type: 'text' },
            { name: 'staffPassword', type: 'text' },
            { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
            { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
          ],
        })
        app.save(settings)

        const record = new Record(settings)
        record.set('shared_password', 'hjk')
        record.set('staffPassword', 'hjk')
        app.save(record)
      } catch (e) {
        // ignore
      }
    }
  },
  (app) => {
    try {
      const quizAttempts = app.findCollectionByNameOrId('quiz_attempts')
      app.delete(quizAttempts)
    } catch (e) {}
  },
)
