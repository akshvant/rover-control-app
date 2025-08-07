import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Target, Camera, RotateCcw, RotateCw, Play, Pause } from 'lucide-react';

// This is the main component for the rover controller app.
export default function App() {
  const [log, setLog] = useState([]);
  const [cameraIp, setCameraIp] = useState(''); // State to hold the ESP32-CAM IP address
  const [streamUrl, setStreamUrl] = useState(''); // State to hold the constructed stream URL
  const [isStreaming, setIsStreaming] = useState(false); // State to track if streaming is active
  const [isMineDetected, setIsMineDetected] = useState(false); // State for mine detection

  // Function to add a command to the log.
  const addLog = (command) => {
    const timestamp = new Date().toLocaleTimeString();
    setLog(prevLog => [...prevLog, `[${timestamp}] Sent command: ${command}`]);
  };

  // This function simulates sending a command via Bluetooth.
  // In a real-world scenario, you would replace this with a Bluetooth API call.
  const sendCommand = (command) => {
    console.log(`Simulating sending Bluetooth command: ${command}`);
    addLog(command);

    // This is a placeholder for receiving the 'M' command from the rover.
    // In a real app, you would listen for incoming Bluetooth data.
    if (command === 'M') {
      setIsMineDetected(true);
      // Automatically clear mine detection after a short delay for demonstration
      setTimeout(() => setIsMineDetected(false), 3000);
    }
  };

  // Event handlers for the movement controls.
  const handleMove = (direction) => {
    let command;
    switch (direction) {
      case 'forward':
        command = 'F';
        break;
      case 'backward':
        command = 'B';
        break;
      case 'left':
        command = 'L';
        break;
      case 'right':
        command = 'R';
        break;
      case 'stop':
        command = 'S';
        break;
      default:
        return;
    }
    sendCommand(command);
  };

  // Event handlers for the camera controls.
  const handleCameraPan = (direction) => {
    let command;
    switch (direction) {
      case 'pan-left':
        command = 'P-';
        break;
      case 'pan-right':
        command = 'P+';
        break;
      default:
        return;
    }
    sendCommand(command);
  };

  const handleCameraTilt = (direction) => {
    let command;
    switch (direction) {
      case 'tilt-up':
        command = 'T+';
        break;
      case 'tilt-down':
        command = 'T-';
        break;
      default:
        return;
    }
    sendCommand(command);
  };

  // Event handler for the gun-shooting action.
  const handleShoot = () => {
    sendCommand('G');
  };

  // Function to start the video stream
  const startStream = () => {
    if (cameraIp) {
      // ESP32-CAM typically streams on /stream or /cam.jpg
      // Adjust this URL based on your ESP32-CAM's firmware
      setStreamUrl(`http://${cameraIp}/stream`);
      setIsStreaming(true);
      addLog(`Attempting to stream from: http://${cameraIp}/stream`);
    } else {
      addLog("Please enter ESP32-CAM IP address.");
    }
  };

  // Function to stop the video stream
  const stopStream = () => {
    setStreamUrl('');
    setIsStreaming(false);
    addLog("Video stream stopped.");
  };

  // CSS classes for styling buttons and other elements using Tailwind CSS.
  const buttonClass = "bg-sky-500 hover:bg-sky-600 text-white font-bold p-4 rounded-full shadow-lg transition-transform transform hover:scale-110";
  const controlButtonClass = "bg-gray-700 text-white p-6 rounded-full shadow-lg m-2 transition-transform transform hover:scale-110";
  const cameraButtonClass = "bg-gray-700 text-white p-3 rounded-md shadow-lg m-1 transition-transform transform hover:scale-105";
  const inputClass = "p-2 rounded-md bg-slate-900 text-gray-200 border border-slate-700 focus:border-sky-500 focus:ring-sky-500 focus:ring-1 outline-none";

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl p-6 bg-slate-800 rounded-2xl shadow-2xl">

        {/* Title and description */}
        <h1 className="text-4xl font-bold text-center mb-2 text-sky-400">Rover Control Center</h1>
        <p className="text-center text-gray-400 mb-8">Control your Arduino-based rover via Bluetooth and view ESP32-CAM stream</p>

        {/* Main control panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Rover movement controls */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-700 rounded-xl shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 text-sky-300">Rover Movement</h2>
            <div className="grid grid-cols-3 grid-rows-3 gap-2">
              <div className="col-start-2 row-start-1">
                <button onClick={() => handleMove('forward')} className={controlButtonClass} aria-label="Move Forward">
                  <ChevronUp size={36} />
                </button>
              </div>
              <div className="col-start-1 row-start-2">
                <button onClick={() => handleMove('left')} className={controlButtonClass} aria-label="Turn Left">
                  <ChevronLeft size={36} />
                </button>
              </div>
              <div className="col-start-2 row-start-2">
                <button onClick={() => handleMove('stop')} className="bg-red-600 hover:bg-red-700 text-white font-bold p-6 rounded-full shadow-lg transition-transform transform hover:scale-110" aria-label="Stop">
                  <div className="w-8 h-8 rounded-full bg-white animate-pulse"></div>
                </button>
              </div>
              <div className="col-start-3 row-start-2">
                <button onClick={() => handleMove('right')} className={controlButtonClass} aria-label="Turn Right">
                  <ChevronRight size={36} />
                </button>
              </div>
              <div className="col-start-2 row-start-3">
                <button onClick={() => handleMove('backward')} className={controlButtonClass} aria-label="Move Backward">
                  <ChevronDown size={36} />
                </button>
              </div>
            </div>

            <button onClick={handleShoot} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg mt-8 transition-transform transform hover:scale-110 flex items-center">
              <Target size={24} className="mr-2" />
              Shoot Gun
            </button>
          </div>

          {/* Camera and mine detection status */}
          <div className="flex flex-col items-center p-6 bg-slate-700 rounded-xl shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 text-sky-300">Rover Status & Camera</h2>

            {/* Camera IP input and controls */}
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="camera-ip" className="text-sm text-gray-400 mb-1">ESP32-CAM IP Address:</label>
              <div className="flex space-x-2">
                <input
                  id="camera-ip"
                  type="text"
                  value={cameraIp}
                  onChange={(e) => setCameraIp(e.target.value)}
                  placeholder="e.g., 192.168.1.100"
                  className={`${inputClass} flex-grow`}
                />
                {!isStreaming ? (
                  <button onClick={startStream} className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md shadow-lg flex items-center">
                    <Play size={20} className="mr-1" /> Stream
                  </button>
                ) : (
                  <button onClick={stopStream} className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md shadow-lg flex items-center">
                    <Pause size={20} className="mr-1" /> Stop
                  </button>
                )}
              </div>
            </div>

            {/* Camera feed display */}
            <div className="relative w-full aspect-video bg-slate-900 rounded-lg overflow-hidden mb-4 border-4 border-sky-500 flex items-center justify-center">
              {isStreaming && streamUrl ? (
                <img
                  src={streamUrl}
                  alt="ESP32-CAM Stream"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    setIsStreaming(false);
                    setStreamUrl('');
                    addLog("Error: Could not load camera stream. Check IP or connection.");
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                  <Camera size={48} className="mb-2" />
                  <p>Enter ESP32-CAM IP and Start Stream</p>
                </div>
              )}
            </div>

            {/* Camera controls */}
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold mt-4 mb-2 text-sky-300">Camera Pan/Tilt</h3>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <button onClick={() => handleCameraTilt('tilt-up')} className={cameraButtonClass} aria-label="Tilt Up">
                    <ChevronUp size={24} />
                  </button>
                  <div className="flex space-x-2 mt-2">
                    <button onClick={() => handleCameraPan('pan-left')} className={cameraButtonClass} aria-label="Pan Left">
                      <RotateCcw size={24} />
                    </button>
                    <button onClick={() => handleCameraPan('pan-right')} className={cameraButtonClass} aria-label="Pan Right">
                      <RotateCw size={24} />
                    </button>
                  </div>
                  <button onClick={() => handleCameraTilt('tilt-down')} className={cameraButtonClass} aria-label="Tilt Down">
                    <ChevronDown size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mine detection status */}
            <div className="mt-8 w-full">
              <h3 className="text-xl font-semibold text-sky-300 mb-2">Mine Detection</h3>
              <div className={`bg-slate-900 rounded-md p-4 text-center ${isMineDetected ? 'border-2 border-red-500' : ''}`}>
                {isMineDetected ? (
                  <p className="text-red-500 font-bold text-lg animate-pulse">MINE DETECTED!</p>
                ) : (
                  <p className="text-green-500 font-bold text-lg">No Mines Detected</p>
                )}
                <p className="text-gray-400 text-sm mt-1">The proximity sensor is used for obstacle and "mine" detection. The Arduino code sends an 'M' command when an object is detected.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Command Log */}
        <div className="mt-8 p-4 bg-slate-900 rounded-lg shadow-inner max-h-48 overflow-y-auto">
          <h2 className="text-xl font-semibold text-sky-300 mb-2">Command Log</h2>
          <ul className="text-sm font-mono text-gray-300">
            {log.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
