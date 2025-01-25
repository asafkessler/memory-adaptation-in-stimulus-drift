document.getElementById("userInfoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Collect user input data from the form
    const userInfo = {
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value,
      education: document.getElementById("education").value,
    };
  
    // Initialize the jsPsych experiment
    var jsPsych = initJsPsych();
  
    // Create a pre-experiment trial that shows the user information they entered
    var introTrial = {
      type: 'html-keyboard-response',
      stimulus: `<h2>Thank you for providing your information!</h2>
                 <p>Age: ${userInfo.age}</p>
                 <p>Gender: ${userInfo.gender}</p>
                 <p>Education: ${userInfo.education}</p>
                 <p>Press any key to start the experiment.</p>`,
    };
  
    // Create a simple reaction time task as an example
    var experimentTrial = {
      type: 'html-keyboard-response',
      stimulus: 'Press the space bar as quickly as you can when you see the stimulus.',
      choices: ['space'],
      response_ends_trial: true,
    };
  
    // Define the experiment timeline
    var timeline = [introTrial, experimentTrial];
  
    // Add user info to the jsPsych data object
    jsPsych.data.addProperties({
      age: userInfo.age,
      gender: userInfo.gender,
      education: userInfo.education
    });
  
    // Start the experiment
    jsPsych.init({
      timeline: timeline,
      on_finish: function() {
        jsPsych.data.displayData(); // Show collected data after the experiment
      }
    });
  });
  