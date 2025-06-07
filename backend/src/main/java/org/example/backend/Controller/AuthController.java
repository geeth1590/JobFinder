package org.example.backend.Controller;

import org.example.backend.DTO.AuthDto.*;
import org.example.backend.Model.Auth.*;
import org.example.backend.Enum.ERole;
import org.example.backend.Repository.AuthRepos.RoleRepository;
import org.example.backend.Repository.AuthRepos.UserRepository;
import org.example.backend.Security.Jwt.JwtUtils;
import org.example.backend.Security.Services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;


import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        JwtResponse response = new JwtResponse(jwt, userDetails.getUsername(), userDetails.getEmail(), roles ,userDetails.getId());
        return ResponseEntity.ok(response);

    }

    @PostMapping("/signup/job_seeker")
    public ResponseEntity<?> registerJobSeeker(@Valid @RequestBody JobSeekerSignupRequest signUpRequest) {
        return registerUser(signUpRequest, ERole.ROLE_JOB_SEEKER, JOB_SEEKER.class);
    }

    @PostMapping(value = "/signup/admin", produces = "application/json")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody AdminSignupRequest signUpRequest) {
        return registerUser(signUpRequest, ERole.ROLE_ADMIN, Admin.class);
    }

    @PostMapping(value="/signup/company")
    public ResponseEntity<?> registerCompany(@Valid @RequestBody CompenySignUpRequest signUpRequest) {
        return registerUser(signUpRequest, ERole.ROLE_COMPANY, Compeny.class);
    }




    private <T extends User, R extends SignupRequest> ResponseEntity<?> registerUser(R signUpRequest, ERole role, Class<T> userClass) {
        try {
            if (userRepository.existsByUsername(signUpRequest.getUsername())) {
                return new ResponseEntity<>(new MessageResponse(HttpStatus.BAD_REQUEST.value(), "Error", "Error: Username is already taken!", null), HttpStatus.BAD_REQUEST);
            }

            if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                return new ResponseEntity<>(new MessageResponse(HttpStatus.BAD_REQUEST.value(), "Error", "Error: Email is already taken!", null), HttpStatus.BAD_REQUEST);

            }

            // Create new user's account
            T user;
            try {
                user = userClass.getDeclaredConstructor().newInstance();
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: User type not supported"));
            }

            user.setUsername(signUpRequest.getUsername());
            user.setEmail(signUpRequest.getEmail());
            user.setPassword(encoder.encode(signUpRequest.getPassword()));

            if (user instanceof JOB_SEEKER && signUpRequest instanceof JobSeekerSignupRequest) {
                JOB_SEEKER jobSeeker = (JOB_SEEKER) user;
                JobSeekerSignupRequest jobSeekerSignupRequest = (JobSeekerSignupRequest) signUpRequest;
                jobSeeker.setAddress(jobSeekerSignupRequest.getAddress());
                jobSeeker.setAge(jobSeekerSignupRequest.getAge());
            }

            if (user instanceof Compeny && signUpRequest instanceof CompenySignUpRequest) {
                Compeny compeny = (Compeny) user;
                CompenySignUpRequest compenySignUpRequest = (CompenySignUpRequest) signUpRequest;
                compeny.setCompenyName(compenySignUpRequest.getCompenyName());
                compeny.setAdress(compenySignUpRequest.getAdress());
                compeny.setPhoneNumber(compenySignUpRequest.getPhoneNumber());

            }if (user instanceof Admin && signUpRequest instanceof AdminSignupRequest) {
                Admin admin = (Admin) user;
                AdminSignupRequest compenySignUpRequest = (AdminSignupRequest) signUpRequest;
                admin.setDepartment(compenySignUpRequest.getDepartment());

            }


            Set<Role> roles = new HashSet<>();
            Role userRole = roleRepository.findByName(role)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);

            user.setRoles(roles);
            userRepository.save(user);

            return new ResponseEntity<>(new MessageResponse(HttpStatus.OK.value(), "Success", "User Registered Success", user), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new MessageResponse(HttpStatus.BAD_REQUEST.value(), "Error", "User Register UnSuccess", null), HttpStatus.BAD_REQUEST);
        }
    }
}
