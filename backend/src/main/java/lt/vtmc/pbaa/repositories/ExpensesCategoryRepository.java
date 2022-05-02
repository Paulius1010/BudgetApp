package lt.vtmc.pbaa.repositories;

import lt.vtmc.pbaa.models.ExpensesCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ExpensesCategoryRepository extends JpaRepository<ExpensesCategory, Integer> {

    Optional<ExpensesCategory> findById(Integer id);

}
