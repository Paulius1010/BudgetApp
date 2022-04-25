package lt.vtmc.pbaa.repositories;

import lt.vtmc.pbaa.models.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {

}
