package com.bremen.backend.global.response;

import java.util.List;

import org.springframework.data.domain.Pageable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListResponse<T> extends CustomResponse {
	List<T> items;
	Pageable pageable;
	Long size;

	public ListResponse(int status, String message, List<T> items, Long size, Pageable pageable) {
		super(status, message);
		this.pageable = pageable;
		this.items = items;
		this.size = size;
	}

	public ListResponse(List<T> items, Long size, Pageable pageable) {
		this.items = items;
		this.size = size;
		this.pageable = pageable;
	}

}
