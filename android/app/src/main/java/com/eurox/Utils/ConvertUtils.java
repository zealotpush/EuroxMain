package com.eurox.Utils;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Hashtable;
import java.util.Iterator;
import java.util.Set;

public class ConvertUtils {
    private ConvertUtils() {}

    public static WritableMap jsonToMap(JSONObject object) {
        WritableMap params = Arguments.createMap();

        if(object != null) {
            Iterator<String> keysItr = object.keys();
            while(keysItr.hasNext()) {
                String key = keysItr.next();
                Object value = getObjectFromJson(object, key);

                if(value instanceof JSONArray){
                    params.putArray(key, jsonArrayToArray((JSONArray) value));
                } else if (value instanceof JSONObject) {
                    params.putMap(key, jsonToMap((JSONObject) value));
                } else if (value instanceof Boolean) {
                    params.putBoolean(key, (Boolean)value);
                } else if (value instanceof Double) {
                    params.putDouble(key, (Double) value);
                } else if (value instanceof Float) {
                    params.putDouble(key, (Float) value);
                } else if (value instanceof Long) {
                    params.putString(key, String.valueOf((Long) value));
                } else if (value instanceof String) {
                    params.putString(key, (String)value);
                } else if (value instanceof Hashtable) {
                    params.putMap(key, hashtableToMap((Hashtable<String, Object>)value));
                } else {
                    params.putNull(key);
                }
            }
        }
        return params;
    }


    public static WritableMap hashtableToMap(Hashtable<String, Object> hashtable){
        WritableMap resultMap = Arguments.createMap();
        Set<String> strings = hashtable.keySet();
        Iterator<String> keySetIterator = strings.iterator();
        while(keySetIterator.hasNext()) {
            String key = keySetIterator.next();
            Object value = hashtable.get(key);
            resultMap.putString(key, (String)value);
        }
        return resultMap;
    }


    public static WritableArray jsonArrayToArray(JSONArray array) {
        WritableArray paramArray = Arguments.createArray();
        if(array !=  null){
            for(int i = 0; i < array.length(); i++) {
                Object value = null;
                value = getObjectFromJsonArrayIndex(array, i, value);
                if(value instanceof JSONArray) {
                    paramArray.pushArray(jsonArrayToArray((JSONArray) value));
                } else if(value instanceof JSONObject) {
                    paramArray.pushMap(jsonToMap((JSONObject) value));
                }else{
                    paramArray.pushNull();
                }

            }
        }
        return paramArray;
    }

    private static Object getObjectFromJsonArrayIndex(JSONArray array, int i, Object value) {
        try {
            value = array.get(i);
        } catch (JSONException ignore) {
        }
        return value;
    }

    @Nullable
    private static Object getObjectFromJson(JSONObject object, String key) {
        Object value = null;
        try {
            value = object.get(key);
        } catch (JSONException ignore){
        }
        return value;
    }
}
