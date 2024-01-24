img="";
model_status="";
objects = [];

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    ObjectDetection = ml5.objectDetector("cocossd", modelLoaded);
}

function modelLoaded(){
    console.log("Model Loaded Successfully");
    model_status=true;
    ObjectDetection.detect(img, getResults);
}

function getResults(e,r){
    if(e){
        console.error(e);
    } 
    else{
        objects = r;
        console.log(r);
    }

}


function preload(){
    img = loadImage("dog_cat.jpg");
}

function draw(){
    image(img, 0, 0,640, 420);
   

    if(model_status != ""){
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            object_name = objects[i].label;
            obj_acc = floor(objects[i].confidence*100);
            obj_x = objects[i].x;
            obj_y = objects[i].y;
            obj_width = objects[i].width;
            obj_length = objects[i].height;
            fill("blue");
            stroke("blue");
            textSize(20);
            text(object_name+" "+obj_acc+"%",obj_x,obj_y);
            noFill();
            stroke("blue");
            rect(obj_x,obj_y,obj_width,obj_length);  


        }
    }

}