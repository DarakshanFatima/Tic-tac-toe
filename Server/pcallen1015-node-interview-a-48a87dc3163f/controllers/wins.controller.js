const mongoose = require("mongoose");
const Win = require('mongoose').model('Win');

/**
 * LIST
 * 
 * Retrieve ALL Wins from the database
 */
exports.wins_get_all = (req, res, next) => {
  Win.find()
    .select("name game _id score symbol")
    .exec()
    .then(items => {
      const response = {
        count: items.length,
        Win: items.map(item => {
          return {
            name: item.name,
            game: item.game,
            score: item.score,
            symbol: item.symbol,
            _id: item._id,
            request: {
              type: "GET",
              url: "http://localhost:8080/wins/" + item._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

/**
 * CREATE
 * 
 * Create a new Win document
 */
exports.wins_create_win = (req, res, next) => {
    const win = new Win({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      game: req.body.game,
      score: req.body.score,
      symbol: req.body.symbol
    });
    win
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created win successfully",
          createdWin: {
            name: result.name,
            game: result.game,
            score: result.score,
			symbol: result.symbol,
            _id: result._id,
            request: {
              type: "GET",
              url: "http://localhost:8080/wins/" + result._id
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  

/**
 * READ
 * 
 * Retrieve a SINGLE Win from the database
 */
exports.wins_get_win = (req, res, next) => {
    const id = req.params.id;
    Win.findById(id)
      .select("name game _id score symbol")
      .exec()
      .then(item => {
        console.log("From database", item);
        if (item) {
          res.status(200).json({
            win: item,
            request: {
              type: "GET",
              url: "http://localhost:8080/wins"
            }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };

/**
 * UPDATE
 * 
 * Update an existing Win
 */
exports.wins_update_win = (req, res) => {
    // Validate Request
    // if(!req.body.content) {
        // return res.status(400).send({
            // message: "content can not be empty"
        // });
    // }  
	// Find Win and update it with the request body
    // Win.findByIdAndUpdate(req.params.id, {
        // content: req.body.content
    // }, {new: true})
    // .then(win => {
        // if(!win) {
            // return res.status(404).send({
                // message: "Win not found with id " + req.params.id
            // });
        // }
         //res.send(win);
		 res.status(200).send({
                message: 'PUT request successfulll!!!!'
            });
    // }).catch(err => {
        // if(err.kind === 'ObjectId') {
            // return res.status(404).send({
                // message: "Win not found with id " + req.params.id
            // });                
        // }
        // return res.status(500).send({
            // message: "Error updating win with id " + req.params.id
        // });
    // });
  //const id = req.params.id;
    // const updateOps = {};
    // for (const ops of req.body) {
      // updateOps[ops.propName] = ops.value;
    // }
    // Win.update({ _id: id }, { $set: updateOps })
      // .exec()
      // .then(result => {
        // res.status(200).json({
          // message: "Win updated",
          // request: {
            // type: "GET",
            // url: "http://localhost:8080/wins/" + id
          // }
        // });
      // })
      // .catch(err => {
        // console.log(err);
        // res.status(500).json({
          // error: err
        // });
      // });
  };

/**
 * DELETE
 * 
 * Delete an existing Win
 */
exports.wins_delete = (req, res, next) => {
    const id = req.params.id;
    Win.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Win deleted",
          request: {
            type: "POST",
            url: "http://localhost:8080/wins",
            body: { name: "String", game: "String", score: "String" }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  