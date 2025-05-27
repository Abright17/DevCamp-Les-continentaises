package org.apache.camel.AppAmis;


import org.apache.camel.CamelContext;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.impl.DefaultCamelContext;
public class App {
	public static void main(String[] args) throws Exception {
        CamelContext context = new DefaultCamelContext();
        context.addRoutes(new RouteBuilder() {
            @Override
            public void configure() {
                from("timer://start?repeatCount=1")
                    .setBody(constant("Qui est là ?"))
                    .to("activemq:queue:demande")
                    .log("AppAmi a envoyé : ${body}");

                from("activemq:queue:reponse")
                    .log("AppAmi a reçu : ${body}");
            }
        });
        context.start();
        Thread.sleep(5000);
        context.stop();
    }
}