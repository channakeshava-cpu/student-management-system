package com.apex.studentmanagement.service;

import com.apex.studentmanagement.dto.AuthResponseDTO;
import com.apex.studentmanagement.dto.LoginRequestDTO;
import com.apex.studentmanagement.dto.RegisterRequestDTO;
import com.apex.studentmanagement.entity.AppUser;
import com.apex.studentmanagement.exception.DuplicateUserException;
import com.apex.studentmanagement.exception.InvalidCredentialsException;
import com.apex.studentmanagement.security.Role;
import com.apex.studentmanagement.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;


public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void firstTest() {
        System.out.println("JUnit is working!");
    }

    @Test
    void register_ShouldRegisterUserSuccessfully(){

        RegisterRequestDTO dto = new RegisterRequestDTO();
        dto.setUsername("keshava");
        dto.setEmail("keahava@gmail.com");
        dto.setPassword("Password123");
        dto.setRole(Role.USER);

        when(userRepository.existsByUsername("keshava"))
                .thenReturn(false);

        when(userRepository.existsByEmail("keshava@gmail.com"))
                .thenReturn(false);

        when(passwordEncoder.encode("Password123"))
                .thenReturn("hashedPassword");

        String result = authService.register(dto);

        assertEquals("User registered successfully.", result);

        verify(userRepository).save(any(AppUser.class));


    }

    @Test
    void register_ShouldThrowException_WhenUsernameAlreadyExists() {

        RegisterRequestDTO dto = new RegisterRequestDTO();
        dto.setUsername("keshava");
        dto.setEmail("keshava@gmail.com");
        dto.setPassword("Password123");
        dto.setRole(Role.USER);

        when(userRepository.existsByUsername("keshava"))
                .thenReturn(true);

        DuplicateUserException exception = assertThrows(
                DuplicateUserException.class,
                () -> authService.register(dto)
        );

        assertEquals("Username already exists", exception.getMessage());

        verify(userRepository, never()).save(any(AppUser.class));
    }

    @Test
    void login_ShouldReturnJwt_WhenCredentialsAreValid(){

        LoginRequestDTO dto = new LoginRequestDTO();
        dto.setUsername("keshava");
        dto.setPassword("Password123");

        AppUser user = new AppUser();
        user.setUsername("keshava");
        user.setPassword("hashedPassword");
        user.setRole(Role.USER);

        when(userRepository.findByUsername("keshava"))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("Password123","hashedPassword"))
                .thenReturn(true);

        when(jwtService.generateToken("keshava"))
                .thenReturn("fake-jwt-token");

        AuthResponseDTO response = authService.login(dto);

        assertEquals("fake-jwt-token",response.getToken());

        verify(jwtService).generateToken("keshava");
    }

    @Test
    void login_shouldThrowException_WhenPasswordIsWrong(){
        LoginRequestDTO dto = new LoginRequestDTO();
        dto.setUsername("keshava");
        dto.setPassword("WrongPassword");

        AppUser user = new AppUser();
        user.setUsername("keshava");
        user.setPassword("hashedPassword");
        user.setRole(Role.USER);

        when(userRepository.findByUsername("keshava"))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("WrongPassword","hashedPassword"))
                .thenReturn(false);

        InvalidCredentialsException exception = assertThrows(
                InvalidCredentialsException.class,
                ()-> authService.login(dto)
        );
        assertEquals("Invalid username or password",
                exception.getMessage());

        verify(jwtService, never()).generateToken(anyString());
    }

    @Test
    void login_ShouldThrowException_WhenUserDoesNotExist(){

        LoginRequestDTO dto = new LoginRequestDTO();
        dto.setUsername("unknown");
        dto.setPassword("Password123");

        when(userRepository.findByUsername("unknown"))
                .thenReturn(Optional.empty());

        InvalidCredentialsException exception = assertThrows(
                InvalidCredentialsException.class,
                ()-> authService.login(dto)

        );

        assertEquals("Invalid username or password",
                exception.getMessage());

        verify(jwtService,never()).generateToken(anyString());
    }

    @Test
    void register_ShouldSaveEncodedPassword(){

        RegisterRequestDTO dto = new RegisterRequestDTO();
        dto.setUsername("keshava");
        dto.setEmail("keshava@gmail.com");
        dto.setPassword("Password123");
        dto.setRole(Role.USER);

        when(userRepository.existsByUsername(anyString()))
                .thenReturn(false);

        when(userRepository.existsByEmail(anyString()))
                .thenReturn(false);

        when(passwordEncoder.encode("Password123"))
                .thenReturn("hashedPassword");

        authService.register(dto);

        ArgumentCaptor<AppUser> captor = ArgumentCaptor.forClass(AppUser.class);

        verify(userRepository).save(captor.capture());

        AppUser savedUser = captor.getValue();

        assertEquals("hashedPassword", savedUser.getPassword());
    }
}
