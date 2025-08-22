package com.bonsms002

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

class MmsReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        Log.d("MmsReceiver", "MMS received: action=${intent.action}")
        // TODO: handle MMS if needed
    }
}
