package com.bremen.backend.global.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ForwardedHeaderFilter;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI openAPI() {
		Info info = new Info()
			.version("v1.0.0")
			.title("API")
			.description("");

		String jwt = "JWT";
		SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwt); // 헤더에 토큰 포함
		Components components = new Components().addSecuritySchemes(jwt, new SecurityScheme()
			.name(jwt)
			.type(SecurityScheme.Type.HTTP)
			.scheme("bearer")
			.bearerFormat("JWT")
		);

		List<Server> serverList = new ArrayList<>();

		serverList.add(new Server().url("https://k10a104.p.ssafy.io"));
		serverList.add(new Server().url("http://localhost:8080"));

		return new OpenAPI()
			.info(info)
			.addSecurityItem(securityRequirement)
			.components(components)
			.servers(serverList);
	}

	@Bean
	ForwardedHeaderFilter forwardedHeaderFilter() {
		return new ForwardedHeaderFilter();
	}
}

