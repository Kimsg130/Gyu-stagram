package com.kimsg130.gyustagram.controller;

import com.kimsg130.gyustagram.firebase.ImageUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class ImageUploadController {

    @Autowired
    private ImageUploadService imageUploadService;

    @PostMapping("/image")
    public String uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            // 파일이 없는 경우 예외 처리
            throw new IllegalArgumentException("업로드할 파일을 선택해주세요.");
        }
        String apiImagePath = imageUploadService.uploadImage(file);
        String publicImagePath = apiImagePath.replace("https://storage.googleapis.com/download/storage/v1", "https://firebasestorage.googleapis.com/v0");

        return publicImagePath;
    }

}
