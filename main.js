
status="";
objects= [];

function preload(){

}



 function setup(){
 canvas=createCanvas(380,380);
 canvas.center();
 video=createCapture(VIDEO);
 video.hide();
 video.size(380,380);



 }

 function Start(){
   objectdetector=ml5.objectDetector("cocossd",modelloaded);
   document.getElementById("status").innerHTML="status: detecting objects";
    }

 function draw(){
   image(video,0,0,380,380);
   if(status!="")
   
   {
      objectdetector.detect(video,gotresult);
      for(i=0; i<objects.length; i++){
         document.getElementById("status").innerHTML="status: Objects detected";
         document.getElementById("Number_Of_Objects").innerHTML='Number of objects detected are : '+objects.length;
         fill("red");
         percent=floor(objects[i].confidence*100);
         text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
         noFill();
         stroke("red");
         rect( objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      }
   
   }
   
   
   }


 function modelloaded(){
    console.log("Model Is Loaded");
    status=true;

    


 }

 function gotresult(error,results)
 {
    if(error){
console.log(error);

    }
  console.log(results);
    objects=results;
 }

 