package com.bonsms002

import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.util.Log

class HeadlessSmsSendService : Service() {
    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("HeadlessSmsSendService", "SMS send request received")
        // TODO: Implement handling for outgoing SMS if needed
        return START_NOT_STICKY
    }
}
