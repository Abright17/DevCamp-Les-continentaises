package org.apache.camel.appami;

import org.apache.camel.CamelContext;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.impl.DefaultCamelContext;
import org.apache.camel.ProducerTemplate;

public class App {
    public static void main(String[] args) throws Exception {
        CamelContext context = new DefaultCamelContext();

        context.addRoutes(new RouteBuilder() {
            public void configure() {
               
                from("timer://start?repeatCount=1")
                    .setBody(constant("Qui est là"))
                    .to("rabbitmq://localhost:5672/ami?queue=amiToVoyageur&username=guest&password=guest");

               
                from("rabbitmq://localhost:5672/ami?queue=voyageurToAmi&username=guest&password=guest")
                    .to("stream:out");
            }
        });

        context.start();
        Thread.sleep(5000);
        context.stop();
    }
}
