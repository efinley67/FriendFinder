var friendInfo = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendInfo);
  });

  app.post("api/friends", function(req, res) {
    var newUser = req.body;
    var differences = [];

    if (friendInfo.length > 1) {
      friendInfo.forEach(function(user) {
        var totalDiff = 0;

        for (var i = 0; newUser.answers.length; i++) {
          var friendAnswer = user.answers[i];
          var userAnswer = newUser.answers[i];
          var diff = +friendAnswer - +userAnswer;
          totalDiff += Math.abs(diff);
        }

        differences.push(totalDiff);
      });

    var minDiff = Math.min.apply(null, differences);

    var bestFriends = [];

    for (var i = 0; i < differences.length; i++) {
      if (differences[i] === minDiff) {
        bestFriends.push(friendInfo);
      }
    }

    res.json(bestFriends);
  } else {
    res.json(friendInfo);
  }

  friendInfo.push(newUser);
  });
};
