package com.example.tle_app

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText

class VerificationActivity : AppCompatActivity() {
    private lateinit var verify: Button
    private lateinit var otpView: EditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_verification)
        verify = findViewById(R.id.button)
        otpView = findViewById(R.id.editTextTextNumber)
//        verify.setOnClickListener {
//
//        }
    }
}