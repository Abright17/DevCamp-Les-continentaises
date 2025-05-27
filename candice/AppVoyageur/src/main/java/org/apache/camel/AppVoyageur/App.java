package org.apache.camel.AppVoyageur;

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
	                from("activemq:queue:demande")
	                    .log("AppVoyageur a reçu : ${body}")
	                    .setBody(constant("Présent"))
	                    .to("activemq:queue:reponse");
	            }
	        });
	        context.start();
	        Thread.sleep(10000);
	        context.stop();
	    }
	}