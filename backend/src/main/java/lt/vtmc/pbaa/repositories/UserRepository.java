package lt.vtmc.pbaa.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import lt.vtmc.pbaa.models.User;

@CrossOrigin
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);

	Boolean existsByEmail(String email);
	
	Optional<User> findByUsername(String username);
	
	Boolean existsByUsername(String username);
	
	void deleteById(Long id);
	
}
