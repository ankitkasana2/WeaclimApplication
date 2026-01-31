
package com.weaclimm;

import android.Manifest;
import android.content.Intent;
import android.os.Bundle;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.i18nmanager.I18nUtil;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  private static final String[] INITIAL_PERMS = {
      Manifest.permission.ACCESS_FINE_LOCATION,
      Manifest.permission.READ_CONTACTS
  };

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    // Handle activity results, if needed
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // Show splash screen
    SplashScreen.show(this);

    super.onCreate(savedInstanceState);

    // @Override
    // protected void onCreate(Bundle savedInstanceState) {
    // SplashScreen.show(this, R.style.SplashTheme); // here
    // super.onCreate(savedInstanceState);
    // I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
    // sharedI18nUtilInstance.forceRTL(this, false); //
    // sharedI18nUtilInstance.allowRTL(this, true);
    // AccessToken accessToken = AccessToken.getCurrentAccessToken();
    // boolean isLoggedIn = accessToken != null && !accessToken.isExpired();

    // Prevent screenshot or screen recording
    getWindow().setFlags(
        WindowManager.LayoutParams.FLAG_SECURE,
        WindowManager.LayoutParams.FLAG_SECURE);

    // Disable RTL layout (changed to getInstance())
    I18nUtil.getInstance().allowRTL(this, false);
  }

  // }
  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule
   * rendering of the component.
   */

  @Override
  protected String getMainComponentName() {
    // Return the name of the main component
    return "NamalWoocommerce";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        DefaultNewArchitectureEntryPoint.getFabricEnabled() // Enable Fabric if necessary
    );
  }

  // @Override
  // protected ReactRootView createRootView() {
  // return new RNGestureHandlerEnabledRootView(this); // Enable gesture handler
  // }
}
