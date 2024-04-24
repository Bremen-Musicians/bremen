package com.bremen.backend.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final CorsConfig corsConfig;
	private static final String[] PERMIT_URL_ARRAY = {
		/* swagger v3 */
		"/v3/api-docs/**",
		"/swagger-ui/**"
	};

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
			.sessionManagement(
				(session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			)
			.csrf(AbstractHttpConfigurer::disable)
			.authorizeHttpRequests(
				auth -> auth
					.requestMatchers(PERMIT_URL_ARRAY).permitAll()
					.requestMatchers(HttpMethod.GET, "/error").permitAll()
					.requestMatchers(HttpMethod.POST, "/error").permitAll()
					.anyRequest().authenticated()
			).cors(
				cors -> cors.configurationSource(corsConfig.corsConfigurationSource())
			);

		return httpSecurity.build();
	}

}
