$(window).ready(function(){
  console.log("custom.js");
  changeStep = function (elem, way) {
    console.log("changeStep()");
    var currentStep = "";
    var stepWanted = "";
    if (way == "indicator") {
      //console.log("Clicked on numeric indicator");
      currentStep = $(".step.active").attr("id");
      stepWanted = $(elem).parent().attr("idStep");
      console.log("Current step: " + currentStep);
      console.log("Wanted step: " + stepWanted);
      if (validator(currentStep, stepWanted) == true)
      {
        $(".step").removeClass("active");
        $("#mainForm").find("#step"+stepWanted).addClass("active");
      }
      else {
        // Error
      }
    }
    else if (way == "forwardBtn") {
      //console.log("Clicked on forward button");
      currentStep = $(".step.active").attr("idStep");
      stepWanted = +currentStep + 1;
      console.log("Current step: " + currentStep);
      console.log("Step wanted: " + stepWanted);
      if (validator(currentStep, stepWanted) == true)
      {
        $(".step").removeClass("active");
        $("#mainForm").find("#step"+stepWanted).addClass("active");
      }
    }
  };
  validator = function (currentStep, stepWanted) {
    console.log("validator()");
    return true;
  };
});
