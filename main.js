status = "";

function preload() {
}
function setup() {
canvas = createCanvas(300, 300);
canvas.position(480, 200);

video = createCapture(VIDEO);
video.hide();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById('status').innerHTML = "Status : Detecting Object...";
}
objects = [];
function draw() {
    image(video, 0, 0, 300, 300);
    
    if(status != "") {
        for(i = 0; i < objects.length; i++) {
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById('status').innerHTML  = "Status : Object Detected";
            document.getElementById('objectNum').innerHTML = "Number Of Objects Detected : " + objects.length;
            stroke(r,g,b);
            strokeWeight(1);    
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x - 70, objects[i].y - 15);
            noFill();
            strokeWeight(3);
            stroke(r,g,b);
            rect(objects[i].x - 70, objects[i].y - 10, objects[i].width, objects[i].height - 150);
        }
    }

}
function modelLoaded() {
    console.log("model loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, result) {
if(error) {
    console.error();
} 
    console.log(result);
    objects = result;
}