package org.apache.camel.AppVoyage;

import org.apache.camel.CamelContext;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.impl.DefaultCamelContext;

public class App {
    public static void main(String[] args) throws Exception {
        CamelContext context = new DefaultCamelContext();

        context.addRoutes(new RouteBuilder() {
            public void configure() {
                // Reçoit "Qui est là", affiche, répond "Present"
                from("rabbitmq://localhost:5672/ami?queue=amiToVoyageur&username=guest&password=guest")
                    .log("Reçu: ${body}")
                    .setBody(constant("Present"))
                    .to("rabbitmq://localhost:5672/ami?queue=voyageurToAmi&username=guest&password=guest");
            }
        });

        context.start();
        Thread.sleep(5000);
        context.stop();
    }
}

