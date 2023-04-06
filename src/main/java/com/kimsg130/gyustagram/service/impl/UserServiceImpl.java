package com.kimsg130.gyustagram.service.impl;

import com.kimsg130.gyustagram.dto.ResponseDto;
import com.kimsg130.gyustagram.dto.SignUpDto;
import com.kimsg130.gyustagram.model.User;
import com.kimsg130.gyustagram.repository.UserRepository;
import com.kimsg130.gyustagram.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    @Autowired UserRepository userRepository;


    @Override
    public boolean existsEmail(String email) {
        Optional<User> users = userRepository.findByEmail(email);

        if(users.isEmpty())
            return false;
        else
            return true;
    }

    @Override
    public ResponseDto<?> signUp(SignUpDto dto) {
        String userEmail = dto.getEmail();
        String userPassword = dto.getPassword();
        String userPasswordCheck = dto.getPasswordCheck();

        // email중복확인
        try{
            if(existsEmail(userEmail))
                return ResponseDto.setFailed("Existed Email!!");
        } catch (Exception e) {
            return ResponseDto.setFailed("DataBase Error!!");
        }


        // 비밀번호 체크!
        if(!userPassword.equals(userPasswordCheck))
            return ResponseDto.setFailed("Password does not matched!");

        // User생성
        User user = new User(dto);

        try{
            userRepository.save(user);
        } catch (Exception e) {
            return  ResponseDto.setFailed("DataBase Error!!(save)");
        }
        // 성공!
        return ResponseDto.setSuccess("SignUp Success!!", null);
    }
}

//    private UserRepository userRepository;
//    @Override
//    public User createUser(User user) {
//        return userRepository.save(user);
//    }
//
//    @Override
//    public User getUserById(Long id) {
//        Optional<User> optionalUser = userRepository.findById(id);
//        return optionalUser.get();
//    }
//
//    @Override
//    public List<User> getAllUser() {
//        return userRepository.findAll();
//    }
//
//    @Override
//    public User updateUser(User user) {
//        User existingUser = userRepository.findById(user.getId()).get();
//        existingUser.setEmail(user.getEmail());
//        existingUser.setPhone(user.getPhone());
//        existingUser.setPassword(user.getPassword());
//        existingUser.setName(user.getName());
//        existingUser.setNickname(user.getNickname());
//        existingUser.setComment(user.getComment());
//        existingUser.setImage(user.getImage());
//        User updatedUser = userRepository.save(existingUser);
//        return updatedUser;
//    }
//
//    @Override
//    public void deleteUser(Long id) {
//        userRepository.deleteById(id);
//    }

