/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ovbvyqwq88w8le8",
    "created": "2024-11-08 01:34:47.548Z",
    "updated": "2024-11-08 01:34:47.548Z",
    "name": "memo",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "txjpzqcj",
        "name": "title",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ovbvyqwq88w8le8");

  return dao.deleteCollection(collection);
})
