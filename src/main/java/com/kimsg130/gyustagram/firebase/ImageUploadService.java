package com.kimsg130.gyustagram.firebase;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ImageUploadService {

    @Autowired
    private Bucket bucket;

    public String uploadImage(MultipartFile file) throws IOException {
        // 파일을 임시 디렉토리에 저장
        Path tempFile = Files.createTempFile(UUID.randomUUID().toString(), file.getOriginalFilename());
        Files.copy(file.getInputStream(), tempFile, StandardCopyOption.REPLACE_EXISTING);

        // Firebase Storage에 파일 업로드
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Blob blob = bucket.create(fileName, Files.readAllBytes(tempFile));

        // 업로드된 파일의 공개적인 URL 반환
        String imageUrl = blob.getMediaLink();

        // 임시 파일 삭제
        Files.delete(tempFile);

        return imageUrl;
    }
}
