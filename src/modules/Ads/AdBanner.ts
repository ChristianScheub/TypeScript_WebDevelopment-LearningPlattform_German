import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from "@capacitor/core";

  const showBanner = async () => {
    let adId: string;
    if (Capacitor.getPlatform() === 'android') {
      adId = 'ca-app-pub-6250689577715326/7839519075';
    } else if (Capacitor.getPlatform() === 'ios') {
      adId = 'ca-app-pub-6250689577715326/2339780389';
    } else {
      adId = 'ca-app-pub-6250689577715326/7839519075';
    }

    const options: BannerAdOptions = {
      adId: adId,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0
    };
    await AdMob.showBanner(options);
  };

  export default showBanner;