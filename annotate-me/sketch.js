let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/FSvYhlZNg/';

let video;
let flippedVideo;

let label = '';

let yes;
let yesFade = 0;

let no;
let noFade = 0;

let love;
let loveFade = 0;

let question;
let questionFade = 0;

let wakanda;
let wakandaFade = 0;

let clap;
let clapFade = 0;

let away;
let awayFade = 0;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  no = loadImage('./assets/no.png');
  love = loadImage('./assets/love.png');
  question = loadImage('./assets/question.png');
  wakanda = loadImage('./assets/wakanda.png');
  away = loadImage('./assets/away.png');
}


function setup() {
  createCanvas(1280, 720);
  video = createCapture(VIDEO);
  video.size(160, 120);

  flippedVideo = ml5.flipImage(video);
  classifyVideo();
}

function draw() {
  background(0, 255, 0);
  imageMode(CORNER);


  if (label == 'No') {
    noFade = 255;
  } else if (label == 'Question') {
    questionFade = 255;
  } else if (label == 'Away') {
    awayFade = 255;
  } else if (label == 'Heart') {
    loveFade = 255;
  } else if (label == 'WakandaForever') {
    wakandaFade = 255;
  }

  if (yesFade > 0) {
    tint(255, yesFade);
    image(yes, 0, 0);
    yesFade -= 300;
  }

  if (noFade > 0) {
    tint(255, noFade);
    image(no, 0, 0);
    noFade -= 300;
  }

  if (loveFade > 0) {
    tint(255, loveFade);
    image(love, 0, 0);
    loveFade -= 300;
  }

  if (questionFade > 0) {
    tint(255, questionFade);
    image(question, 0, 0);
    questionFade -= 300;
  }

  if (clapFade > 0) {
    tint(255, clapFade);
    image(clap, 0, 0);
    clapFade -= 300;
  }

  if (awayFade > 0) {
    tint(255, awayFade);
    image(away, 0, 0);
    awayFade -= 300;
  }

  if (wakandaFade > 0) {
    tint(255, wakandaFade);
    image(wakanda, 0, 0);
    wakandaFade -= 300;
  }

}

function classifyVideo() {
  // flippedVideo = ml5.flipImage(video);
  classifier.classify(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;
  classifyVideo();
}
