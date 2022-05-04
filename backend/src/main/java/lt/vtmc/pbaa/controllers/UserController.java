package lt.vtmc.pbaa.controllers;

import java.util.Optional;

import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.vtmc.pbaa.models.User;
import lt.vtmc.pbaa.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

	private final UserService userService;

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

}
