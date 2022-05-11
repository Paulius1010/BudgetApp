package lt.vtmc.pbaa.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.vtmc.pbaa.models.Income;
import lt.vtmc.pbaa.models.Role;
import lt.vtmc.pbaa.models.User;
import lt.vtmc.pbaa.payload.requests.SignupRequest;
import lt.vtmc.pbaa.payload.responses.MessageResponse;
import lt.vtmc.pbaa.repositories.RoleRepository;
import lt.vtmc.pbaa.repositories.UserRepository;
import lt.vtmc.pbaa.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

	private final UserService userService;
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	PasswordEncoder encoder;
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/{email}")
	public ResponseEntity<Optional<User>> getUserByEmail(@PathVariable String email) {
		return ResponseEntity.ok().body(userService.getUserByEmail(email));
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ADMIN')")
	public void deleteUser(@PathVariable Long id) {
		userService.deleteUserById(id);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ADMIN')")
	public ResponseEntity<?>  updateUser(@PathVariable("id") Long id, @Valid @RequestBody SignupRequest signUpRequest) {
		
		User user = userRepository.findById(id).get();
	
		Set<Role> roles = new HashSet<>();
		roles.add((Role) signUpRequest.getRole());
		user.setRoles(roles);
		user.setUsername(signUpRequest.getUsername());
		user.setEmail(signUpRequest.getEmail());
		if(signUpRequest.getPassword() != null) {
			user.setPassword(encoder.encode(signUpRequest.getPassword()));
		}
		

		userRepository.save(user);
		return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<User>> getAllUsers() {
		return ResponseEntity.ok().body(this.userRepository.findAll());
	}
	
}
