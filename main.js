inp = "";
obr = [];
stats = "";
function preload(){}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(480,380);
    video.hide();
}

function draw(){
    image(video,0,0,480,380);
    if(stats != ""){
        od.detect(video, gotResult);
        for ( i = 0; i< obr.length; i++) {
            document.getElementById("stats").innerHTML = "Status : Objects Detected";

            fill("red");
            stroke("red");
            percent = floor(obr[i].confidence *100);
            text(obr[i].label +" "+percent+"%", obr[i].x +15, obr[i].y +15);
            noFill();
            rect(obr[i].x, obr[i].y, obr[i].width, obr[i].height);
        }
    }
}
function start(){
    od = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("stats").innerHTML = "Status : Detecting Objects";
    inp = document.getElementById("obj").value ;
    if (obr.label == inp) {
        video.stop();
        od.detect(gotResult);
        document.getElementById("stats").innerHTML = "Status : Object Mentioned Found";
        var synth = window.speechSynthesis;
        utterThis = new SpeechSynthesisUtterance("Object Mentioned Found");
        synth.speak(utterThis);
    }else{
        document.getElementById("stats").innerHTML = "Status : Objects Mentioned Not Found";
    }
}
function modelLoaded(){
    console.log("Model is Loaded");
    stats = true;
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        obr = results;
    }
}
