package com.letterbook.user.application.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    
    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviarEmailRecuperacaoSenha(String email, String token) {
        String resetUrl = frontendUrl + "/reset-password?token=" + token;
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Recuperação de Senha - LetterBook");
        message.setText(String.format("""
            Olá!
            
            Você solicitou a recuperação de sua senha no LetterBook.
            
            Clique no link abaixo para redefinir sua senha:
            %s
            
            Este link expira em 1 hora.
            
            Se você não solicitou esta recuperação, ignore este email.
            
            Atenciosamente,
            Equipe LetterBook
            """, resetUrl));
        
        mailSender.send(message);
    }
}

