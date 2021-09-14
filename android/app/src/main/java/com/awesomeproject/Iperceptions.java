package com.awesomeproject;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Hashtable;
import com.iperceptions.iperceptionssdk.iPerceptionsSDK;
import android.app.Activity;
import android.os.Looper;
import android.os.Handler;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;


public class Iperceptions extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactAppContext;

    Iperceptions(ReactApplicationContext context) {
        super(context);
        this.reactAppContext = context;
    }

    @Override
    public String getName() {
        return "Iperceptions";
    }

    @ReactMethod
    public void initialize(String apiKey) {
        iPerceptionsSDK.init(apiKey);
    }

    @ReactMethod
    public void clearCache() {
        iPerceptionsSDK.clearCache(this.reactAppContext);
    }

    @ReactMethod
    public void triggerSurvey(ReadableMap readableMap, String environment, String LOB) {
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        Hashtable<String, String> urlVariables = new Hashtable<String, String>();
        String key = "";
        while (iterator.hasNextKey()) {
            key = iterator.nextKey();
            urlVariables.put(key, readableMap.getString(key));
        }
        new Handler(Looper.getMainLooper()).post(new Runnable(){
            @Override
            public void run() {
                iPerceptionsSDK.setUrlVariables(urlVariables);
                iPerceptionsSDK.setShowNotification(false);
                Activity activity = getCurrentActivity();
                Hashtable<String, String> eventVariables = new Hashtable<String, String>();
                eventVariables.put("Language", "English");
                eventVariables.put("Environment", environment);
                eventVariables.put("LOB", LOB);
                iPerceptionsSDK.triggerEvent(eventVariables, activity);
            }
        });
    }

    @ReactMethod
    public void removeSurveyIcon() {
        new Handler(Looper.getMainLooper()).post(new Runnable(){
            @Override
            public void run() {
                iPerceptionsSDK.destroy();
            }
        });
    }
}