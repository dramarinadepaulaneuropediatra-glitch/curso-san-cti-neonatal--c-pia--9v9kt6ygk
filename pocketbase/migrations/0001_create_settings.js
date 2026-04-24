migrate(
  (app) => {
    const collection = new Collection({
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
    app.save(collection)

    const record = new Record(collection)
    record.set('shared_password', 'hjk')
    record.set('staffPassword', 'hjk')
    app.save(record)
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId('settings')
      app.delete(collection)
    } catch (e) {
      // ignore
    }
  },
)
