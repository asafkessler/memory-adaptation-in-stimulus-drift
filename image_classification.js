// Initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
      jsPsych.data.displayData(); // Display data at the end
    }
  });
  
  // Enter fullscreen
  var enter_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true
  };
  
  // Exit fullscreen
  var exit_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: false,
    delay_after: 0
  };
  
  // Instructions for the experiment
  var instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<h2>Welcome to the Image Classification Experiment</h2>
               <p>You will see a series of images. Your task is to classify each image by choosing the correct label.</p>
               <p>Click "Start" when you are ready to begin.</p>`,
    choices: ['Start']
  };
  
  // Define an image classification trial
  var createImageTrial = function(imagePath) {
    return {
      type: jsPsychImageButtonResponse,
      stimulus: imagePath,
      choices: ['Class A', 'Class B'],
      prompt: "<p>Is this person happy or sad?</p>",
      on_finish: function(data) {
        console.log(data); // Log response data
      }
    };
  };
  
  // Create a timeline of image trials
  var imagePaths = [
    'img/happy_face_1.png',
    'img/sad_face_1.png',
    'img/happy_face_2.png',
    'img/sad_face_2.png'
  ];
  
  var imageTrials = imagePaths.map(createImageTrial);
  
  // Debriefing message
  var debrief = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<h2>Thank you for participating!</h2>
               <p>Your responses have been recorded.</p>
               <p>Click "Finish" to end the experiment.</p>`,
    choices: ['Finish']
  };
  
  // Build the experiment timeline
  var timeline = [];
  timeline.push(enter_fullscreen);
  timeline.push(instructions);
  timeline.push(...imageTrials); // Add image trials to timeline
  timeline.push(exit_fullscreen);
  timeline.push(debrief);
  
  // Start the experiment
  jsPsych.run(timeline);
  