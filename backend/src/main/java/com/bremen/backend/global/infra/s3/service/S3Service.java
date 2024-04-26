package com.bremen.backend.global.infra.s3.service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Service
@RequiredArgsConstructor
public class S3Service {

	private final S3Client s3Client;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	/* Get */
	public String getURL(String keyName) {
		String URL = "";
		try {
			GetUrlRequest request = GetUrlRequest.builder()
				.bucket(bucket)
				.key(keyName)
				.build();

			URL = s3Client.utilities().getUrl(request).toString();
		} catch (S3Exception e) {
			e.printStackTrace();
		}
		return URL;
	}

	/* UPLOAD */
	public String streamUpload(String dirName, MultipartFile file) throws IOException {
		String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
		String objectKey = dirName + "/" + makeFileName() + "." + extension;

		try {
			PutObjectRequest putObjectRequest = PutObjectRequest.builder()
				.bucket(bucket)
				.key(objectKey)
				.build();

			s3Client.putObject(putObjectRequest, getFileRequestBody(file));

		} catch (S3Exception e) {
			e.printStackTrace();
		}

		return objectKey;
	}

	/* DELETE */
	public void deleteObject(String objectKey) {
		try {
			DeleteObjectRequest dor = DeleteObjectRequest.builder()
				.bucket(bucket)
				.key(objectKey)
				.build();
			s3Client.deleteObject(dor);
		} catch (S3Exception e) {
			e.printStackTrace();
		}
	}

	private static String makeFileName() {
		// Now(yyyyMMddHHmmss)
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		Date now = new Date();
		String date = sdf.format(now);

		// UUID
		String uuid = UUID.randomUUID().toString().replaceAll("-", "");
		return uuid + date;
	}

	private static RequestBody getFileRequestBody(MultipartFile file) throws IOException {
		return RequestBody.fromInputStream(file.getInputStream(), file.getSize());
	}
}
