package com.bremen.backend.global.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthorizationFilter extends OncePerRequestFilter {

	private static final String HEAD = "/api/v1";
	private static final List<String> SECURED_URIS = Arrays.asList(
		HEAD + "/articles/challenge"
		// Add more secured URIs here...
	);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		String requestURI = request.getRequestURI();
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (SECURED_URIS.contains(requestURI)) {
			if (!authentication.getAuthorities().stream().anyMatch(
				auth -> auth.getAuthority().equals("ROLE_ADMIN")
			))
				throw new AccessDeniedException("권한이 없는 사용자입니다.");
		}
		filterChain.doFilter(request, response);
	}
}
