import React, { useRef } from 'react'
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"
import Webcam from "react-webcam"
import '../../App.css'
import {drawHand} from './utilties'




function Hand() {

    // reference for using webcam and canvas in functions
    const webcamRef = useRef(null)
    const canvasRef = useRef(null)

    const runHandpose = async () => {
        const net = await handpose.load()
        console.log("handpose model loaded")
        // loop and detect hands
        setInterval(() => {
            detect(net)
        }, 100)

    }
    const detect = async (net) => {
        //check if video is avaiable
        if (typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4) {

            // Get video properties
            const video = webcamRef.current.video
            const videoWidth = webcamRef.current.video.videoWidth
            const videoHeight = webcamRef.current.video.videoHeight

            //set video height and width
            webcamRef.current.video.width = videoWidth
            webcamRef.current.video.width = videoHeight

            //set canvas height and width
            canvasRef.current.width = videoWidth
            canvasRef.current.height = videoHeight

            //make detections
            const hand = await net.estimateHands(video)
            console.log(hand);

            // Draw mesh
            const ctx = canvasRef.current.getContext("2d");
            drawHand(hand, ctx);
        }

    }

    runHandpose()

    return (
        <div>
            <Webcam ref={webcamRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 480

                }} />

            <canvas ref={canvasRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 480
                }} />
        </div>
    )
}

export default Hand