# Rover Control App

A web-based controller for an Arduino-powered rover with an ESP32-CAM video stream.

## Features

-   **Movement Controls:** Forward, Backward, Left, Right, and Stop.
-   **Camera Pan/Tilt:** Controls for adjusting the ESP32-CAM's position.
-   **Gun Control:** A button to trigger a specific action (e.g., fire a projectile).
-   **Video Streaming:** Live video feed from an ESP32-CAM module.
-   **Command Log:** Displays a history of commands sent to the rover.

## Setup Instructions

### 1. Arduino Sketch
Upload the appropriate code to your Arduino/ESP32 board to enable Bluetooth communication and respond to the commands listed below.

-   **Commands:**
    -   `F`: Forward
    -   `B`: Backward
    -   `L`: Left
    -   `R`: Right
    -   `S`: Stop
    -   `T+`: Tilt Up
    -   `T-`: Tilt Down
    -   `P+`: Pan Right
    -   `P-`: Pan Left
    -   `G`: Fire Gun

### 2. ESP32-CAM
Upload the `CameraWebServer` example sketch from the Arduino IDE to your ESP32-CAM, configuring it with your Wi-Fi credentials. The IP address displayed in the serial monitor should be entered into the web app to view the live stream.

### 3. Running the Web App

1.  **Clone the repository:**
    ```bash
    git clone [Your Repository URL]
    cd rover-control-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    ```

The app will open in your browser at `http://localhost:3000`.

## Technologies Used

-   **React:** For the user interface.
-   **Tailwind CSS:** For styling.
-   **Lucide React:** For icons.
