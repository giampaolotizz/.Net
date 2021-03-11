package it.contrader.utils;

import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import it.contrader.domain.Bug;

/**
 * Classe che contiene metodi di utilita' per l'invio e la gestione di e-mail
 * 
 * @author Francesco, Gianni, Marco
 *
 */
public class MailUtility {
	
	/**
	 * Metodo statico che manda una mail a tutti gli utenti quando uno stato viene modificato
	 * 
	 * @param allMail Lista di e-mail che devono ricevere il messaggio
	 * @param bugToSend Bug aggiornato di cui inviare informazioni
	 */
	public static void sendMailToAll(List<String> allMail, Bug bugToSend) {        
		String from = "aggiornostato@libero.it";
		
		Properties properties = System.getProperties();
		
		properties.put("mail.smtp.host", "smtp.libero.it");
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.debug", "true");
        //properties.put("mail.smtp.socketFactory.port", "587");
        //properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        
        String text = "ATTENZIONE! E' stato modificato un bug\n" + bugToSend.toString();
		
        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, "Aggiornostato1.");
            }
        });
           
        session.setDebug(true);
        
        for (String mail: allMail) {
			try {						
				Message msg = new MimeMessage(session);
				msg.setFrom(new InternetAddress(from));
				msg.addRecipient(Message.RecipientType.TO, new InternetAddress(mail));
				msg.setSubject("Aggiornamento stato bug " + bugToSend.getId());
				msg.setText(text);
				Transport.send(msg);
			} catch (Exception e) {
				e.printStackTrace();
			}
        }
	}
}
