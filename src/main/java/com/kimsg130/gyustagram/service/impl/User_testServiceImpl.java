package com.kimsg130.gyustagram.service.impl;

import com.kimsg130.gyustagram.model.User_test;
import com.kimsg130.gyustagram.repository.User_testRepository;
import com.kimsg130.gyustagram.service.User_testService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class User_testServiceImpl implements User_testService {
    private User_testRepository user_testRepository;
    @Override
    public User_test createUser_test(User_test user_test) {
        return user_testRepository.save(user_test);
    }

    @Override
    public User_test getUser_testByU_num(Long u_num) {
        Optional<User_test> optionalUser_test = user_testRepository.findById(u_num);
        return optionalUser_test.get();
    }

    @Override
    public List<User_test> getAllUser_test() {
        return user_testRepository.findAll();
    }

    @Override
    public User_test updateUser_test(User_test user_test) {
        User_test existingUser = user_testRepository.findById(user_test.getU_num()).get();
        existingUser.setUserName(user_test.getUserName());
        User_test updatedUser = user_testRepository.save(existingUser);
        return updatedUser;
    }

    @Override
    public void deleteUser_test(Long u_num) {
        user_testRepository.deleteById(u_num);
    }
}
