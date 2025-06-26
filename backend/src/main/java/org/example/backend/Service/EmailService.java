package org.example.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {


        @Autowired
        private JavaMailSender mailSender;

        public void sendApprovalEmail(String to, String subject, String body) {
           try {
               System.out.println("to:::::::::::::::::::::::"+to);
               SimpleMailMessage message = new SimpleMailMessage();
               message.setFrom("geethkau@gmail.com"); // same as configured
               message.setTo(to);
               message.setSubject(subject);
               message.setText(body);
               mailSender.send(message);
               System.out.println("mail sent!!");
           } catch (Exception e) {
               e.printStackTrace();
           }
        }


}
