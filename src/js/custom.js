$(window).ready(function() {
  changeStep = function (elem, way) {
    console.log("changeStep()");
    var currentStep = "";
    var stepWanted = "";
    var validOrNot = "";
    currentStep = $(".step.active").attr("idStep");
    way == "indicator" ? stepWanted = $(elem).parent().attr("idStep") : stepWanted = +currentStep + 1;
    validOrNot = validator(currentStep, stepWanted);
    console.log("Validator returned: " + validOrNot);
    if (validOrNot == true) {
      $("#step"+currentStep+" .error").hide();
      $(".stepIndicator").removeClass("active");
      $(".stepIndicator[idstep='"+stepWanted+"']").addClass("active");
      $(".step").removeClass("active");
      $("#step"+stepWanted).addClass("active");
      $(".step").hide();
      $("#step"+stepWanted).show();
    }
    else if (validOrNot == false) {
      $("#step"+currentStep+" .errorNoInfo").show();
    }
    else if (validOrNot == "error") {
      $("#step"+currentStep+" .secondError").show();
    }
  };
  validator = function (currentStep, stepWanted) {
    console.log("validatior(Current step: "+currentStep+", Wanted step: "+stepWanted+")");
    if(currentStep != 5 && stepWanted < 5) {
      toggleInputsDisabled(false);
    }
    else if(currentStep == 5 && stepWanted < 5) {
      toggleInputsDisabled(false);
      return true;
    }
    if (stepWanted < currentStep) {
      // Going back to any of the previous steps
      return true;
    }
    else if ((stepWanted - currentStep) > 1 ) {
      // Trying to itereate steps too much, can positively iterate by 1, even if step is previously filled I chose not to show an error message
      return;
    }
    if (currentStep == 1) { // STEP 1 VALIDATION
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
    if (currentStep == 2) { // STEP 2 VALIDATION
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
    if (currentStep == 3) { // STEP 3 VALIDATION
      var combinedValues = [];
      $("#step3 input[type='checkbox']:checked").each(function() {
        combinedValues.push($(this).val());
      });
      var negativityCount = 0;
      for (var i = 0; i < combinedValues.length; i++) {
          if (combinedValues[i] === "error") {
              negativityCount++;
          }
      }
      if(combinedValues.length < 2) {
        return false;
      }
      else if (negativityCount >= 2 ) {
        return "error";
      }
      else {
        return true;
      }
    }
    if (currentStep == 4) { // STEP 4 VALIDATION
      var moneyMade = $("#step4 input").val();
      if ($(moneyMade).length == 0 && $("#job").val().length == 0) {
        return false;
      }
      else if(moneyMade < 400 || $(moneyMade).length != 0) {
        return "error";
      }
      else if (stepWanted == 5) {
        console.log("Current step = 5");
        $("#step5 .error").hide();
        $("#step"+currentStep+" .error").hide();
        $(".stepIndicator").removeClass("active");
        $(".stepIndicator[idstep='5']").addClass("active");
        $(".step").removeClass("active");
        $("#mainForm").find("#step5").addClass("active");
        $(".step").show();
        toggleInputsDisabled(true);
        $("#forwardBtn").click(function(){
          console.log("Trying to finalize credit card application");
          if($("#step5 input[type='checkbox']:checked").length == 1) {
            console.log("Data is confirmed");
            $(".step, .formHeader *, .formFooter button").hide();
            $("#success").show();
          }
          else {
            $("#step5 .error").show();
          }
        });
      }
    }
  };
  function toggleInputsDisabled(onOrOff) {
    // Toggle Inputs to disabled, so that you could not change any of the information of the confirmation page
    $(".step:not(.active)").find("input, select, textarea").each(function() {
      $(this).prop( "disabled", onOrOff );
    });
  }
});
