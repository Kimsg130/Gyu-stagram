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
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int postId;

    @Column(nullable = false)
    private String follower;

    @Column(nullable = false)
    private String following;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime followDate;

    @PrePersist
    protected void prePersist() {
        if (this.followDate == null) followDate = LocalDateTime.now();
    }

}
