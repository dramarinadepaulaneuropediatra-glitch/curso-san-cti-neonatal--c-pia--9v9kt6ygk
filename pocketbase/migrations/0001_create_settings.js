migrate(
  (app) => {
    const collection = new Collection({
      name: 'settings',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: '',
      deleteRule: null,
      fields: [
        { name: 'staffPassword', type: 'text', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)

    const record = new Record(collection)
    record.set('id', 'settings0000001')
    record.set('staffPassword', 'hjk')
    app.save(record)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('settings')
    app.delete(collection)
  },
)
