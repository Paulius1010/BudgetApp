package lt.vtmc.pbaa.repositories;

import lt.vtmc.pbaa.models.Expense;
import lt.vtmc.pbaa.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUser(Optional<User> user);
}
