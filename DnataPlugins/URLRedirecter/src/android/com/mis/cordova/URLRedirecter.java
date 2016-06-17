package com.mis.cordova;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import java.io.DataOutputStream;
import java.net.CookieHandler;
import java.net.CookieManager;
import java.net.HttpURLConnection;
import java.net.URL;


/**
 * This class encrypts a message called from JavaScript.
 */
public class URLRedirecter extends CordovaPlugin {

    private static String client = "SDS";

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        if (action.equals("redirect")) {
            final JSONArray input = args;
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    redirect(input, callbackContext);
                }
            });

            return true;
        }
        return false;
    }

    private static void redirect(JSONArray input, CallbackContext callbackContext) {
        if (input != null && input.length() > 2) {

            try {
                callbackContext.success(redirect(input));
            } catch (Exception e) {
                callbackContext.error("Failed to redirect url");
            }
        } else {
            callbackContext.error("Expected one non-empty string arguments.");
        }
    }

    private static String redirect(JSONArray input) throws Exception {
        CookieManager cookieManager = new CookieManager();
        CookieHandler.setDefault(cookieManager);

        URL url = new URL(input.getString(0));
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

        try {
            int responseCode = urlConnection.getResponseCode();
            urlConnection.disconnect();

            url = new URL(input.getString(1));
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setDoOutput(true);
            urlConnection.setChunkedStreamingMode(0);
            urlConnection.setRequestMethod("POST");
            urlConnection.setRequestProperty("Content-type", "application/x-www-form-urlencoded");

            DataOutputStream dStream = new DataOutputStream(urlConnection.getOutputStream());
            dStream.writeBytes(input.getString(2)); //Writes out the string to the underlying output stream as a sequence of bytes
            dStream.flush(); // Flushes the data output stream.
            dStream.close();
            urlConnection.setInstanceFollowRedirects(false);
            urlConnection.connect();

            boolean redirect = false;
            int status = urlConnection.getResponseCode();
            if (status != HttpURLConnection.HTTP_OK) {
                if (status == HttpURLConnection.HTTP_MOVED_TEMP
                    || status == HttpURLConnection.HTTP_MOVED_PERM
                    || status == HttpURLConnection.HTTP_SEE_OTHER)
                    redirect = true;
            }

            String newUrl = "";

            if (redirect) {

                // get redirect url from "location" header field
                newUrl = urlConnection.getHeaderField("Location");
            }

            return newUrl;
        } finally {
            urlConnection.disconnect();
        }

    }
}
