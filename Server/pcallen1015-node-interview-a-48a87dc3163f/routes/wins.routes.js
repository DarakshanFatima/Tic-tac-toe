const express = require("express");
const router = express.Router();
const winsCtrl = require('../controllers/wins.controller');

/**
 * Win routes
 * @param {*} app 
 */
//module.exports = (app) => {

    // 1) Get all the Wins from the database

    // 2) Create a new Win
    router.get("/", winsCtrl.wins_get_all);
    
    router.post("/", winsCtrl.wins_create_win);
    
    router.get("/:id", winsCtrl.wins_get_win);
    
    router.put("/:id", winsCtrl.wins_update_win);
    
    router.delete("/:id", winsCtrl.wins_delete);
//}
module.exports = router;