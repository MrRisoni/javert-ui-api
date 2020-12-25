package com.mrrisoni.javert;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@ComponentScan(basePackages = {"core"})
@SpringBootApplication
@EnableJpaRepositories("spring_repos")
@EntityScan("entities")
public class JavertApplication {

	public static void main(String[] args) {
		SpringApplication.run(JavertApplication.class, args);
	}

}
