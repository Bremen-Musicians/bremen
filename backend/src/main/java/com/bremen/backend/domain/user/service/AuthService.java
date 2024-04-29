package com.bremen.backend.domain.user.service;

import com.bremen.backend.domain.user.dto.UserLoginRequest;
import com.bremen.backend.domain.user.dto.UserLoginResponse;

public interface AuthService {
	UserLoginResponse login(UserLoginRequest userLoginRequest);
}
