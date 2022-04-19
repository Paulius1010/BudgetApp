package lt.vtmc.pbaa.repositories;

import lt.vtmc.pbaa.models.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {

    List<Income> findById(String id);
}
