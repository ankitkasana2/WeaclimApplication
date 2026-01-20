
package com.weaclimm;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new DefaultReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      // Return true if debugging is enabled
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      // Return the list of packages, including any manually added ones
      return new PackageList(this).getPackages();
    }

    @Override
    protected String getJSMainModuleName() {
      // Return the name of the JavaScript entry point
      return "index";
    }

    @Override
    protected boolean isNewArchEnabled() {
      // Return true if New Architecture (Fabric and TurboModules) is enabled
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }

    @Override
    protected Boolean isHermesEnabled() {
      // Return true if Hermes is enabled
      return BuildConfig.IS_HERMES_ENABLED;
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    // Return the React Native host
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // Initialize SoLoader
    SoLoader.init(this, /* native exopackage */ false);

    // Initialize Flipper only in debug mode
    if (BuildConfig.DEBUG) {
      ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    }

    // Initialize New Architecture if enabled
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      DefaultNewArchitectureEntryPoint.load();
    }
  }
}
