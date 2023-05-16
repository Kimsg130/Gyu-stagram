package com.kimsg130.gyustagram.dto;

import lombok.Data;

@Data
public class CommentRequestDto {
    private String userId;
    private int postId;
    private String comment;
}
