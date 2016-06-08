package com.mis.cordova;

import android.util.Base64;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;


/**
* This class encrypts a message called from JavaScript.
*/
public class Encrypter extends CordovaPlugin {

    private static String client = "SDS";

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        if (action.equals("encrypt")) {
            final String message = args.getString(0);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    encrypt(message, callbackContext);
                }
            });

            return true;
        }
        return false;
    }

    private static void encrypt(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {

            try {
                callbackContext.success(encrypt(message));
            } catch (Exception e) {
                callbackContext.error("Failed to encrypt message"+message+".");
            }
        } else {
            callbackContext.error("Expected one non-empty string arguments.");
        }
    }

    private static String encrypt(String text) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        byte[] keyBytes= new byte[16];
        byte[] b= client.getBytes("UTF-8");
        int len= b.length;
        if (len > keyBytes.length) len = keyBytes.length;
        System.arraycopy(b, 0, keyBytes, 0, len);
        SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
        IvParameterSpec ivSpec = new IvParameterSpec(keyBytes);
        cipher.init(Cipher.ENCRYPT_MODE,keySpec,ivSpec);

        byte[] results = cipher.doFinal(text.getBytes("UTF-8"));
        return Base64.encodeToString(results, Base64.DEFAULT);
    }
}
