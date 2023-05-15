package com.kimsg130.gyustagram.model;

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
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int likeId;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false) // or가 들어가서 레포지토리에서 쿼리에러가 남 TODO : 칼럼명 바꾸기
    private int postOrCommentId;

    @Column(nullable = false)
    private String kind;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime likeDate;

    @PrePersist
    protected void prePersist() {
        if (this.likeDate == null) likeDate = LocalDateTime.now();
    }
}
