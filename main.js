song = "";
song1 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeft = 0;
scoreRight = 0;
leftSongStatus = "";
rightSongStatus = "";

function preload() {
  song = loadSound("music.mp3");
  song1 = loadSound("music2.mp3");
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function gotPoses(results) {
  if (results.length > 0) {
    scoreLeft = results[0].pose.keypoints[9].score;
    scoreRight = results[0].pose.keypoints[10].score;
    //console.log(scoreLeft);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    //console.log(
    //  `Left wrist X cordinate = ${leftWristX} and Y cordinate = ${leftWristY}`
    //);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    //console.log(
    //  `right Wrist X cordinate = ${rightWristX} and Y cordinate = ${rightWristY}`
    //);
  }
}

function modelLoaded() {
  console.log("poseNet is initialized");
}

function draw() {
  image(video, 0, 0, 600, 500);

  leftSongStatus = song.isPlaying();
  fill("red");
  stroke("red");
  if (scoreLeft > 0.2) {
    circle(leftWristX, leftWristY, 20);
    song1.stop();
    if (leftSongStatus === false) {
      song.play();
      document.getElementById("song").innerHTML = "Harry Potter";
    }
  }
  rightSongStatus = song1.isPlaying();
  fill("red");
  stroke("red");
  if (scoreRight > 0.2) {
    circle(rightWristX, rightWristY, 20);
    song.stop();
    if (rightSongStatus === false) {
      song1.play();
      document.getElementById("song").innerHTML = "Peter Pan";
    }
  }
}
