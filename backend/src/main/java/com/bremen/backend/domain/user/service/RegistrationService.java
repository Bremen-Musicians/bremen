package com.bremen.backend.domain.user.service;

import com.bremen.backend.domain.user.dto.UserRegistrationRequest;
import com.bremen.backend.domain.user.dto.UserResponse;

public interface RegistrationService {
	UserResponse register(UserRegistrationRequest userRegistrationRequest);
}
