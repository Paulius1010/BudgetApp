package lt.vtmc.pbaa.repositories;

import lt.vtmc.pbaa.models.Income;
import lt.vtmc.pbaa.models.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {

	List<Income> findByUser(Optional<User> user);
}
