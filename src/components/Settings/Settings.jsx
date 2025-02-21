import React, { useState } from "react";
import styles from "../../styles/Settings.module.css";
import LightSwitch from "../Light_switch/LightSwitch";
const Settings = () => {
  const [activeTab, setActiveTab] = useState("setting1"); // Используем состояние для отслеживания активной вкладки

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className={styles.settings}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${activeTab === "setting1" ? styles.active : ""}`}
          onClick={() => handleTabClick("setting1")}
        >
          Theme Settings
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "setting1" && (
          <div>
            <LightSwitch />
          </div>
        )}
      </div>
    </section>
  );
};

export default Settings;
