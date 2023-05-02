Status = "";
objects = [];
song="";

function preload(){
    song=loadSound("ram_siya_ram.mp3");

}

function setup(){
    canvas = createCanvas(480,380);
    canvas.position(480,250);
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
}

function modelLoaded(){
    console.log("Model_Loaded");
    Status = true;
}
function draw(){
    image(video,0,0,480,380);
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

            if(objects[i].label == "person"){
                song.stop();
                
                document.getElementById("object_found").innerHTML = " Baby found";
                
            }
            else{
                song.play();

                document.getElementById("object_found").innerHTML =  "  Baby Not Found";
            }
        }
        if(objects.length == 0){
            song.play();

                document.getElementById("object_found").innerHTML =  "  Baby Not Found";
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


