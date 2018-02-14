$(window).ready(function(){
  console.log("custom.js");
  changeStep = function (elem, way) {
    console.log("changeStep()");
    var currentStep = "";
    var stepWanted = "";
    var validOrNot = "";
    if (way == "indicator") {
      //console.log("Clicked on numeric indicator");
      currentStep = $(".step.active").attr("idStep");
      stepWanted = $(elem).parent().attr("idStep");
      console.log("Current step: " + currentStep);
      console.log("Wanted step: " + stepWanted);
      validOrNot = validator(currentStep, stepWanted);
      if (validOrNot == true)
      {
        //console.log("validator() returned true");
        $("#step"+currentStep+" .error").hide();
        $(".stepIndicator").removeClass("active");
        $(elem).parent().addClass("active");
        $(".step").removeClass("active");
        $("#mainForm").find("#step"+stepWanted).addClass("active");
      }
      else if (validOrNot == false){
        //console.log("Validator returned false");
        $("#step"+currentStep+" .errorNoInfo").show();
      }
      else if (validOrNot == "error"){
        console.log("Second error");
        $("#step"+currentStep+" .secondError").show();
      }
    }
    else if (way == "forwardBtn") {
      //console.log("Clicked on forward button");
      currentStep = $(".step.active").attr("idstep");
      stepWanted = +currentStep + 1;
      console.log("Current step: " + currentStep);
      console.log("Step wanted: " + stepWanted);
      validOrNot = validator(currentStep, stepWanted);
      if (validOrNot == true)
      {
        console.log("Validator returned trues");
        $("#step"+currentStep+" .error").hide();
        $(".stepIndicator").removeClass("active");
        $(".stepIndicator[idstep='"+stepWanted+"']").addClass("active");
        console.log("jiai");
        $(".step").removeClass("active");
        $("#step"+stepWanted).addClass("active");
      }
      else if (validOrNot == false){
        console.log("Validator returned false");
        $("#step"+currentStep+" .errorNoInfo").show();
      }
      else if (validOrNot == "error"){
        console.log("Second error");
        $("#step"+currentStep+" .secondError").show();
      }
    }
  };
  validator = function (currentStep, stepWanted) {
    //console.log("validator()");
    if (stepWanted < currentStep)
    {
      return true;
    }
    else if ((stepWanted - currentStep) > 1 )
    {
      /*
        Trying to itereate steps too much, can positively iterate by 1.
        I chose not to show an error message, as this code would get too messy, and as you can see I can already handle error messages.
      */
      return;
    }
    if (currentStep == 1)
    {
      if ($("#step1 input:radio:checked").val() == "error")
      {
        return "error";
      }
      else if ($("#step1 input:radio:checked").length == 0)
      {
        return false;
      }
      else {
        return true;
      }
    }
    if (currentStep == 2)
    {
      if ($("#step2 select").val() == "0")
      {
        return false;
      }
      else if ($("#step2 input").val().length == 5 && $.isNumeric($("#step2 input").val()) == true) {
        return true;
      }
      else {
        return false;
      }
    }
    if (currentStep == 3)
    {
      var combinedValues = [];
      $("#step3 input[type='checkbox']:checked").each(function(){
        combinedValues.push($(this).val());
      });
      var negativityCount = 0;
      for (var i = 0; i < combinedValues.length; i++) {
          if (combinedValues[i] === "error") {
              negativityCount++;
          }
      }
      if(combinedValues.length < 2)
      {
        return false;
      }
      else if (negativityCount >= 2 )
      {
        return "error";
      }
      else
      {
        return true;
      }
    }
    if (currentStep == 4)
    {
        var moneyMade = $("#step4 input").val();
        if ($(moneyMade).length == 0 && $("#job").val().length == 0)
        {
          return false;
        }
        else if(moneyMade < 400 || $(moneyMade).length != 0)
        {
          return "error";
        }
        else {
          return true;
        }
    }
  };
});
