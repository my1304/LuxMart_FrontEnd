import React, { useEffect } from "react";
import "../../styles/LightSwitch.module.css";

const LightSwitch = () => {
  useEffect(() => {
    const slider = document.getElementById("brightness");
    slider.addEventListener("input", adjustSlider);
    adjustSlider({ target: slider });

    return () => {
      slider.removeEventListener("input", adjustSlider);
    };
  }, []);

  const adjustSlider = (e) => {
    const body = document.body;
    const switchLightMin = 40;
    const switchLightMax = 100;
    const tar = e.target;
    const pct = +tar.value / +tar.max;
    const L1 = pct * (switchLightMax - switchLightMin) + switchLightMin;
    const L2 = L1 - 10;
    const L3 = L1 - 37;
    const L = [L1, L2, L3];
    const thumbHueMin = 0;
    const thumbHueMax = 120;
    const thumbHue = pct * (thumbHueMax - thumbHueMin) + thumbHueMin;
    const thumbSat = 90.4;
    const thumbLight = 44.9;
    const thumbHSL = `${thumbHue},${thumbSat}%,${thumbLight}%`;

    // update the slider shade
    L.forEach((light, i) => {
      if (light < 0) light = 0;
      body.style.setProperty(`--l${i + 1}`, `hsl(228,9.8%,${light}%)`);
    });
    // update the thumb icon hue
    body.style.setProperty(`--p`, `hsl(${thumbHSL})`);
    body.style.setProperty(`--pT`, `hsla(${thumbHSL},0)`);
  };

  return (
    <form>
      <label htmlFor="brightness">Brightness</label>
      <input type="range" id="brightness" name="brightness" min="1" max="100" defaultValue="100" />
    </form>
  );
};

export default LightSwitch;
