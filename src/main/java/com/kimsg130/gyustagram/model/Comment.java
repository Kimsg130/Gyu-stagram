package com.kimsg130.gyustagram.model;

import com.kimsg130.gyustagram.dto.CommentRequestDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@EnableJpaAuditing
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int commentId;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private int postId;

    @Column(nullable = false)
    private String comment;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime commentDate;

    @PrePersist
    protected void prePersist() {
        if (this.commentDate == null) commentDate = LocalDateTime.now();
    }

    public Comment(CommentRequestDto dto) {
        this.userId = dto.getUserId();
        this.postId = dto.getPostId();
        this.comment = dto.getComment();
    }
}
