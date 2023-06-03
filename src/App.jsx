import React, { useEffect } from "react";
import Home from "./pages/Home";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/index.css";

function App() {
  useEffect(() => {
    const checkMobileScreen = () => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ||
        window.innerWidth < 768
      ) {
        // Xoay ngang màn hình
        if (window.orientation !== 90 && window.orientation !== -90) {
          if (window.screen && window.screen.orientation) {
            window.screen.orientation.lock("landscape").catch((error) => {
              console.error("Could not lock screen orientation: ", error);
            });
          } else if (window.screen && window.screen.lockOrientation) {
            window.screen.lockOrientation("landscape");
          } else if (window.screen && window.screen.mozLockOrientation) {
            window.screen.mozLockOrientation("landscape");
          }
        }

        // Phóng to toàn màn hình
        if (
          document.documentElement &&
          document.documentElement.requestFullscreen
        ) {
          document.documentElement.requestFullscreen();
        } else if (
          document.documentElement &&
          document.documentElement.mozRequestFullScreen
        ) {
          document.documentElement.mozRequestFullScreen();
        } else if (
          document.documentElement &&
          document.documentElement.webkitRequestFullscreen
        ) {
          document.documentElement.webkitRequestFullscreen();
        } else if (
          document.documentElement &&
          document.documentElement.msRequestFullscreen
        ) {
          document.documentElement.msRequestFullscreen();
        }
      }
    };

    checkMobileScreen();
  }, []);

  return <Home />;
}

export default App;
