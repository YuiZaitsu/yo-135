Status = "";
objects = [];

function setup(){
    canvas = createCanvas(300,290);
    canvas.position(480,250);
    video = createCapture(VIDEO);
    video.size(300,290);
    video.hide();
}

function modelLoaded(){
    console.log("Model_Loaded");
    Status = true;
}
function draw(){
    image(video,0,0,300,290);
    if(Status != ""){

        object_Detector.detect(video, gotResults);


        for(i = 0;i < objects.length;i++){

            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.length);


            fill("Red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("Black");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input_text){
                video.stop();
                object_Detector.detect(gotResults);
                document.getElementById("object_found").innerHTML = input_text+" Found";
                
            }
            else{
                document.getElementById("object_found").innerHTML = input_text + " Not Found";
            }
        }
    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}


function start(){
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
   
}