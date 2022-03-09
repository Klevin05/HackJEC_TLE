package com.example.tle_app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView

class LoginPage : AppCompatActivity() {
    private lateinit var button : Button
    private lateinit var invalid : TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login_page)
        button = findViewById(R.id.button)
        invalid = findViewById(R.id.textView5)
        invalid.visibility = View.INVISIBLE
        button.setOnClickListener{
            var isValid = true
            val username = findViewById<EditText>(R.id.editTextTextEmailAddress).text.toString()
            val password = findViewById<EditText>(R.id.editTextTextPassword).text.toString()
            if(username.isEmpty() or password.isEmpty()) {
                invalid.visibility = View.VISIBLE
                isValid = false
            }
            if(isValid) {
                val intent = Intent(this, VerificationActivity::class.java).apply {
                }
                startActivity(intent)
            }
        }
    }
}