package com.bonsms002

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.provider.Telephony
import android.util.Log

class SmsReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (Telephony.Sms.Intents.SMS_RECEIVED_ACTION == intent.action) {
            val smsMessages = Telephony.Sms.Intents.getMessagesFromIntent(intent)
            for (message in smsMessages) {
                Log.d("SmsReceiver", "SMS from: ${message.displayOriginatingAddress}, body: ${message.messageBody}")
                // TODO: You can forward this to JS layer in React Native if needed
            }
        }
    }
}
