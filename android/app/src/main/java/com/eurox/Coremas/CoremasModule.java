package com.eurox.Coremas;

import android.os.Message;
import android.util.Log;


import com.eurox.Utils.ConvertUtils;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.ksign.coreshield.coremas.ICoreMasListener;
import com.ksign.coreshield.coremas.MasAuth;
import com.ksign.coreshield.coremas.MasParam;
import com.ksign.coreshield.coremas.MasResultCode;

import org.json.JSONException;
import org.json.JSONObject;

public class CoremasModule extends ReactContextBaseJavaModule {
    private final int WHAT_NONE = 0;
    private final int WHAT_POLICY = 1;			//인증 결과
    private final int WHAT_TOKEN_VERIFY = 2;	//검증 결과
    private final int WHAT_FAIL_APP = 3;		//실패 결과
    private int WHAT = WHAT_NONE;
    private final ReactApplicationContext reactContext;

    CoremasModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }
    JSONObject finalResult = new JSONObject();

    Message Msg = Message.obtain();
    @Override
    public String getName() {
        return "RctCoremas";
    }

    @ReactMethod
    public void checkApp() {
        MasAuth auth = new MasAuth();
        auth.start(reactContext , mCoreMasListener, "http://124.243.26.153:9301/");


    }
    private ICoreMasListener mCoreMasListener = new ICoreMasListener() {

        @Override
        public void onCoreMasResult(JSONObject result) {
            String result_code = "";
            String result_msg = "";

            try {
                result_code = result.getString(MasParam.RESULT_CODE);
                result_msg = result.getString(MasParam.RESULT_MSG);
            } catch (JSONException e) {

            }
            if (result_code.equals(MasResultCode.AMM0100)) {
                WHAT = WHAT_POLICY;
            } else if (result_code.equals(MasResultCode.AMM0300)) {
                WHAT = WHAT_TOKEN_VERIFY;
            } else if (result_code.equals((MasResultCode.AMM0339))) {
                WHAT = WHAT_TOKEN_VERIFY;

            }
            // 앱 인증 성공/ 검증 정책 제외
            else if (result_code.equals(MasResultCode.AMMPASS)) {
                WHAT = WHAT_TOKEN_VERIFY;
            }
            // 앱 사용 불가. "result_msg"의 내용을 사용자에게 알려줄지 여부는 이후 서비스 시나리오에 따른다.
            else {
                WHAT = WHAT_FAIL_APP;
            }


            Msg.what = WHAT;
            Msg.obj = "[" + result_code + "]" + result_msg;
            switch (Msg.what) {
                case WHAT_POLICY:
                    Log.d("WHAT_POLICY", (String) Msg.obj);
                    try {
                        finalResult.put("result_code", result_code);
                        finalResult.put("result_msg", result_msg);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                    break;
                case WHAT_TOKEN_VERIFY:
                    Log.d("WHAT_TOKEN_VERIFY", (String) Msg.obj);
                    try {
                        finalResult.put("result_code", result_code);
                        finalResult.put("result_msg", result_msg);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                    break;
                case WHAT_FAIL_APP:
                    Log.d("WHAT_FAIL_APP", (String) Msg.obj);
                    try {
                        finalResult.put("result_code", result_code);
                        finalResult.put("result_msg", result_msg);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    break;
            }
        }
    };

    @ReactMethod
    private void getResultMessage(final Promise promise) throws JSONException {
        WritableMap resultMap = ConvertUtils.jsonToMap(finalResult);
        promise.resolve(resultMap);
    }

}