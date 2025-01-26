import { AdMob, AdOptions } from "@capacitor-community/admob";
import { Capacitor } from "@capacitor/core";
import Logger from "../Logger/Logger";

const showAdInterstitial = async () => {
  try {
    Logger.info("Start Interstitial Ad");
    let adId: string;
      if (Capacitor.getPlatform() === "android") {
        adId = "ca-app-pub-6250689577715326/1494975720";
      } else if (Capacitor.getPlatform() === "ios") {
        adId = "ca-app-pub-6250689577715326/1997538605";
      } else {
        adId = "ca-app-pub-6250689577715326/1494975720";
      }

    const options: AdOptions = {
      adId: adId
    };

    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  } catch (error) {
    Logger.error("Error while loading Interstitial ad: " + error);
  }
};

export default showAdInterstitial;