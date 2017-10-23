$(document).ready(function() {
  var surveyQuest = [
    "I enjoy being in large groups of people",
    "I am a pet person",
    "I get along with my family",
    "I prefer doing outdoor activities",
    "I believe in a higher power",
    "I enjoy watching movies",
    "I play and/or watch a lot of sports",
    "I am up to date with current events",
    "I consider myself an active person",
    "I like to party"
    ]
  });

  var choices = [
    "1 (Strongly Disagree)",
    "2 (Disagree)",
    "3 (Neutral)",
    "4 (Agree)",
    "5 (Strongly Agree)"
  ];

  var surveyDiv = $("#survey");
  i = 0;

questions.forEach(function(question) {
  i++;
  var quest = $("<div class='question'");
  var text = $("<h4>").text("Question " + i);
  var fullQuestion = $("#<p>").text(question);
  var selectAnsw = $("<div class='form-group'>");
  var select = $("<select class='form-control selector'>");
  choices.forEach(function(choice) {
    var option = $("<option>").text(choice);
    select.append(option);
  });
  select.attr("id", "select", +i);
  selectAnsw.append(select);
  quest.append(text, fullQuestion, selectAnsw);
  var br = $("<br>");
  surveyDiv.append(quest, br);
});

$("#submit").on("click", function(event) {
  event.preventDefault();

  var newUser = $("#userName").val();
  var image = $("#image").val();

  if (newUser.length> 0 && image.length>0 {
    var responses = [];
    Object.keys($(".selector")).forEach(function(key) {
      if (responses.length < surveyQuest.length) {
        responses.push($(".selector")[key]).value.charAt(0));
      }
    });

    var surveyData = {
      name: newUser,
      photo: image,
      answers: responses
    };

    $.post("/api/friends", surveyData, function(data) {
      if(data) {
        $("#modalContent").empty();
        $("#userName").val("");
        $("#image").val();

        data.forEach(function(profile) {
          var profileDiv = $("<div class='profile'>");
          var name = profile.name;
          var picUrl = profile.pic;
          var nameHeader = $("<h3>").text(name);
          var pic = $("<img>").attr("src", picUrl);
          profileDiv.append(nameHeader, pic);

          $("modalContent").append(profileDiv);

        });
        if(data.length > 1) {
          $(".modal-title").text("Your besties!");
        } else {
          $("modal-title").text("Your best friend!");
        }

        $("resultModal").modal();
      }
    });
  } else {
    $("#errorModal").modal();
    setTimeout(function() {
      $("#errorModal").modal("hide");
    }, 2000);
  }
  });
});
