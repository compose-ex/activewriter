// ActiveWriter - a test script to be run during stepdown tests

var mongoose = require("mongoose");

// You can taguser
//mongoose.connect(process.env.COMPOSE_URL);
// To get a connection string from the environment
// or you can hardwire it if you wish like so:
mongoose.connect("mongodb://USER:PASS@HOST1:PORT1,HOST2:PORT2/DBNAME?replicaSet=REPLSETID");

var Schema = mongoose.Schema;

var tagSchema = new Schema({
  _id: Number,
  name: String,
  value: Number
});

var Tag = mongoose.model("Tag", tagSchema);

var cntr = 0;

function generateOrUpdate() {
  if (cntr < 100 || Math.random() < 0.2) {
    // Generate
    var tag = new Tag({
      _id: cntr,
      name: "Tag Number " + cntr,
      value: 0
    });
    tag.save(function(err) {
      if (err != null) {
        console.log("Error Writing:" + err)
      } else {
        console.log("Created:"+cntr)
      }
      cntr = cntr + 1;
      setTimeout(generateOrUpdate, Math.random() * 50);
    });
  } else {
    // Update
    var val = Math.round(Math.random() * (cntr - 1));
    Tag.findById(val, function(err, tag) {
      if (err != null) {
        console.log("Error Reading " + val + ": " + err)
        setTimeout(generateOrUpdate, Math.random() * 50);
      } else {
        tag.value = tag.value + 1;
        tag.save(function(err) {
          if (err != null) {
            console.log("Error Updating:" + err)
          } else {
            // console.log("Updated:"+val)
          }
          setTimeout(generateOrUpdate, Math.random() * 50);
        });
      }
    });
  }
}

setTimeout(generateOrUpdate, Math.random() * 50);
setInterval(function() {
  console.log("Counter is " + cntr);
}, 5000);
