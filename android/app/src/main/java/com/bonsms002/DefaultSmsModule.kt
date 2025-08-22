package com.bonsms002

import android.app.Activity
import android.app.role.RoleManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.provider.Telephony
import android.util.Log
import com.facebook.react.bridge.*

class DefaultSmsModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var requestPromise: Promise? = null

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = "DefaultSmsModule"

    @ReactMethod
    fun requestDefaultSmsApp(promise: Promise) {
        val activity = currentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "No current activity available")
            return
        }

        val myPackage = reactContext.packageName
        requestPromise = promise

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val roleManager = reactContext.getSystemService(Context.ROLE_SERVICE) as RoleManager
            if (roleManager.isRoleAvailable(RoleManager.ROLE_SMS)) {
                if (roleManager.isRoleHeld(RoleManager.ROLE_SMS)) {
                    promise.resolve(true) // already default
                } else {
                    val intent = roleManager.createRequestRoleIntent(RoleManager.ROLE_SMS)
                    activity.startActivityForResult(intent, 4321)
                }
            } else {
                promise.reject("ROLE_UNAVAILABLE", "SMS role not available on this device")
            }
        } else {
            val current = Telephony.Sms.getDefaultSmsPackage(reactContext)
            if (current == myPackage) {
                promise.resolve(true) // already default
            } else {
                val intent = Intent(Telephony.Sms.Intents.ACTION_CHANGE_DEFAULT).apply {
                    putExtra(Telephony.Sms.Intents.EXTRA_PACKAGE_NAME, myPackage)
                }
                activity.startActivityForResult(intent, 4321)
            }
        }
    }

    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == 4321) {
            val myPackage = reactContext.packageName
            val isDefault = Telephony.Sms.getDefaultSmsPackage(reactContext) == myPackage
            Log.d("DefaultSmsModule", "onActivityResult: isDefault=$isDefault")
            requestPromise?.resolve(isDefault)
            requestPromise = null
        }
    }

    override fun onNewIntent(intent: Intent?) {}
}
