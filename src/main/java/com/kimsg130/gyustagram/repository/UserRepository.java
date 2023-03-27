package com.kimsg130.gyustagram.repository;

import com.kimsg130.gyustagram.model.User;
import com.kimsg130.gyustagram.model.User_test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
