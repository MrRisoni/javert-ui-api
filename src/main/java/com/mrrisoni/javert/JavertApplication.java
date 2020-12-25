package com.mrrisoni.javert;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = {"core"})
@SpringBootApplication
public class JavertApplication {

	public static void main(String[] args) {
		SpringApplication.run(JavertApplication.class, args);
	}

}
