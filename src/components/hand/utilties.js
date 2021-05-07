// Point for fingers
const fingerJoints = {
    thumb:[0,1,2,3,4],
    indexFinger:[0,5,6,7,8],
    middleFinger:[0,9,10,11,12],
    ringFinger:[0,17,18,19,20]
}

//drawing function
export const drawHand = (predictions, ctx) => {
    // check if we have predictions
    if(predictions.length>0){
        // Loop tyhrough each prediction
        predictions.forEach((prediction)=>{
            // grab landmarks
            const landmarks = prediction.landmarks

            // loop through fingers
            for(let j=0; j< Object.keys(fingerJoints).length; j++) {
                let finger = Object.keys(fingerJoints)[j]
                // loop through pairs of joints
                for (let k=0; k<fingerJoints[finger].length -1; k++) {
                    // get pairs for joints
                    const firstJointIndex = fingerJoints[finger][k]
                    const secondJointIndex = fingerJoints[finger][k+1]

                    //draw path between finger joints
                    ctx.beginPath()
                    ctx.moveTo(
                        landmarks[firstJointIndex][0],
                        landmarks[firstJointIndex][1],
                    )
                    ctx.lineTo(
                        landmarks[secondJointIndex][0],
                        landmarks[secondJointIndex][1],
                        
                    )
                    ctx.strokeStyle = "green"
                    ctx.lineWidth = 4
                    ctx.stroke() 

                }

            }





            // loop through landmarks and draw em
            for (let i = 0; i<landmarks.length; i++) {
                //get x 
                const x = landmarks[i][0]
                //get y 
                const y = landmarks[i][1]
                //start drawing
                ctx.beginPath()
                ctx.arc(x, y, 5, 0, 3 * Math.PI)

                // set line color
                ctx.fillStyle = 'indigo';
                ctx.fill();
            
            }


        })
    }
}