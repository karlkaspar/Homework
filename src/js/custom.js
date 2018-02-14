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
      validOrNot = validator(currentStep, stepWanted);
      if (validOrNot == true) {
        //console.log("validator() returned true");
        $("#step"+currentStep+" .error").hide();
        $(".stepIndicator").removeClass("active");
        $(elem).parent().addClass("active");
        $(".step").removeClass("active");
        $("#mainForm").find("#step"+stepWanted).addClass("active");
      }
      else if (validOrNot == false) {
        //console.log("Validator returned false");
        $("#step"+currentStep+" .errorNoInfo").show();
      }
      else if (validOrNot == "error") {
        console.log("Second error");
        $("#step"+currentStep+" .secondError").show();
      }
      else if(validOrNot == "lastStep") {

      }
    }
    else if (way == "forwardBtn") {
      //console.log("Clicked on forward button");
      currentStep = $(".step.active").attr("idstep");
      stepWanted = +currentStep + 1;
      validOrNot = validator(currentStep, stepWanted);
      if (validOrNot == true) {
        console.log("Validator returned true");
        $("#step"+currentStep+" .error").hide();
        $(".stepIndicator").removeClass("active");
        $(".stepIndicator[idstep='"+stepWanted+"']").addClass("active");
        $(".step").removeClass("active");
        $("#step"+stepWanted).addClass("active");
      }
      else if (validOrNot == false) {
        console.log("Validator returned false");
        $("#step"+currentStep+" .errorNoInfo").show();
      }
      else if (validOrNot == "error") {
        console.log("Second error");
        $("#step"+currentStep+" .secondError").show();
      }
      else if(validOrNot == "lastStep") {

      }
    }
  };
  validator = function (currentStep, stepWanted) {
    toggleInputsDisabled(false);
    //console.log("validator()");
    console.log("Current step: " + currentStep);
    console.log("Wanted step: " + stepWanted);
    if (stepWanted < currentStep) {
      return true;
    }
    else if ((stepWanted - currentStep) > 1 ) {
      /*
        Trying to itereate steps too much, can positively iterate by 1.
        I chose not to show an error message, as this code would get too messy, and as you can see I can already handle error messages.
      */
      return;
    }
    if (currentStep == 1) {
      if ($("#step1 input:radio:checked").val() == "error") {
        return "error";
      }
      else if ($("#step1 input:radio:checked").length == 0) {
        return false;
      }
      else {
        return true;
      }
    }
    if (currentStep == 2) {
      if ($("#step2 select").val() == "0") {
        return false;
      }
      else if ($("#step2 input").val().length == 5 && $.isNumeric($("#step2 input").val()) == true) {
        currentStep = stepWanted;
        return true;
      }
      else {
        return false;
      }
    }
    if (currentStep == 3) {
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
      if(combinedValues.length < 2)  {
        return false;
      }
      else if (negativityCount >= 2 )  {
        return "error";
      }
      else {
        return true;
      }
    }
    if (currentStep == 4) {
        console.log(currentStep);
        var moneyMade = $("#step4 input").val();
        if ($(moneyMade).length == 0 && $("#job").val().length == 0) {
          return false;
        }
        else if(moneyMade < 400 || $(moneyMade).length != 0) {
          return "error";
        }
        else {
          /*STEP 5*/
          console.log("step5");
          $("#step5 .error").hide();
          $("#step"+currentStep+" .error").hide();
          $(".stepIndicator").removeClass("active");
          $(".stepIndicator[idstep='5']").addClass("active");
          $(".step").removeClass("active");
          $("#mainForm").find("#step5").addClass("active");
          toggleInputsDisabled(true);
          $(".step").show();
          $("#forwardBtn").click(function(){
            console.log("Finalize credit card");
            if($("#step5 input[type='checkbox']:checked").length == 1) {
              console.log("confirmData is true");
              $(".step, .formHeader *, .formFooter button").hide();
              $("#success").show();
            }
            else{
              $("#step5 .error").show();
            }
          });
        }
    }
  };
  function toggleInputsDisabled(onOrOff) {
    $(".step:not(.active)").find("input, select, textarea").each(function(){
      $(this).prop( "disabled", onOrOff );
    });
  }
  function hideAllStepsButOne() {

  }
});
