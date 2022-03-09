package com.example.tle_app

//import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
//import android.text.format.Formatter
//import android.net.wifi.WifiManager
//import java.util.*

class MainActivity : AppCompatActivity() {
    private lateinit var button1 : Button
    private lateinit var textLogin : TextView
    private lateinit var invalid : TextView

//    public lateinit var ipAddress : String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        button1 = findViewById(R.id.button)
        textLogin = findViewById(R.id.textView3)
        invalid = findViewById(R.id.textView5)
        invalid.visibility = View.INVISIBLE
//        val wifiManager = applicationContext.getSystemService(Context.WIFI_SERVICE)
//        ipAddress = Formatter.formatIpAddress(wifiManager.connectionInfo)
        button1.setOnClickListener {
            var isValid : Boolean = true
            val name = findViewById<EditText>(R.id.editTextTextPersonName).text.toString()
            val number = findViewById<EditText>(R.id.editTextTextNumber).text.toString()
            val password = findViewById<EditText>(R.id.editTextTextPassword).text.toString()
            if(name.isEmpty() or number.isEmpty() or password.isEmpty()) {
                isValid = false
                invalid.visibility = View.VISIBLE
            }
            if(isValid) {
                val intent = Intent(this, VerificationActivity::class.java).apply {
                }
                startActivity(intent)
            }
        }
        textLogin.setOnClickListener {
            val intent = Intent(this, LoginPage::class.java).apply {
            }
            startActivity(intent)
        }
    }
}