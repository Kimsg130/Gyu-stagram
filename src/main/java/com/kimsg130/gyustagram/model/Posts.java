package com.kimsg130.gyustagram.model;

import com.kimsg130.gyustagram.dto.PostingDto;
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
public class Posts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int postId;

    @Column(nullable = false)
    private String userId;

    @Column
    private String explains;

    @Column(nullable = false)
    private String images;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime postDate;

    @PrePersist
    protected void prePersist() {
        if (this.postDate == null) postDate = LocalDateTime.now();
    }

    public Posts(PostingDto dto) {
        this.userId = dto.getUserId();
        this.explains = dto.getExplains();
        this.images = dto.getImages();
    }
}
