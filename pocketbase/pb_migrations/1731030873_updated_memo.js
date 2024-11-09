/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ovbvyqwq88w8le8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "goi5xvqe",
    "name": "content",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ovbvyqwq88w8le8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "goi5xvqe",
    "name": "context",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
