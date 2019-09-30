package com.thononasoif;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.proyecto26.inappbrowser.RNInAppBrowserPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNCWebViewPackage(),
            new SvgPackage(),
            new SplashScreenReactPackage(),
            new RNScreensPackage(),
            new VectorIconsPackage(),
            new ReactNativeOneSignalPackage(),
            new ReactMaterialKitPackage(),
            new RNInAppBrowserPackage(),
            new RNI18nPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
