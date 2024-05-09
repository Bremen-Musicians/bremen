package com.bremen.backend.global.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SingleResponse<T> extends CustomResponse {
	private T item;

	public SingleResponse(int status, String message, T item) {
		super(status, message);
		this.item = item;
	}

	public SingleResponse(T item) {
		this.item = item;
	}
}
