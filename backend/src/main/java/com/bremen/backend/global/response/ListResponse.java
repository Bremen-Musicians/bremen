package com.bremen.backend.global.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListResponse<T> extends CustomResponse {
	List<T> items;
	int size;

	public ListResponse(int status, String message, List<T> items, int size) {
		super(status, message);
		this.items = items;
		this.size = size;
	}

	public ListResponse(List<T> items, int size) {
		this.items = items;
		this.size = size;
	}
}
