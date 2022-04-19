package lt.vtmc.pbaa.security.services;

import lt.vtmc.pbaa.models.Income;
import lt.vtmc.pbaa.repositories.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService {
    private final IncomeRepository incomeRepository;

    @Autowired
    public IncomeService(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }

   public List<Income> getAllIncomes() {
        return incomeRepository.findAll();
   }

}
