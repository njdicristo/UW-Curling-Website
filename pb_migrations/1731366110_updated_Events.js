/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("35whwuarj76bxnl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "88jujy3a",
    "name": "users",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("35whwuarj76bxnl")

  // remove
  collection.schema.removeField("88jujy3a")

  return dao.saveCollection(collection)
})
