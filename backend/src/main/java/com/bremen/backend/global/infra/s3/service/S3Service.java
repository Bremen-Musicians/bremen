package com.bremen.backend.global.infra.s3.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface S3Service {

	String getURL(String keyName);

	String streamUpload(String dirName, MultipartFile file) throws IOException;

	void deleteObject(String objectKey);
}
