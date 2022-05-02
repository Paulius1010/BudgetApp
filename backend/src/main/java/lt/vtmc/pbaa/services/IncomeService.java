package lt.vtmc.pbaa.services;

import lt.vtmc.pbaa.models.Income;
import lt.vtmc.pbaa.models.User;
import lt.vtmc.pbaa.payload.requests.IncomeInsertRequest;
import lt.vtmc.pbaa.payload.requests.IncomeUpdateRequest;
import lt.vtmc.pbaa.payload.responses.IncomeResponse;
import lt.vtmc.pbaa.repositories.IncomeRepository;
import lt.vtmc.pbaa.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class IncomeService {
	
    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;

    @Autowired
    public IncomeService(IncomeRepository incomeRepository, UserRepository userRepository) {
        this.incomeRepository = incomeRepository;
        this.userRepository = userRepository;
    }

    public IncomeResponse saveIncome(IncomeInsertRequest incomeRequest) {
        String currentPrincipalEmail = getCurrentPrincipalEmail();
    	User user = userRepository.findByEmail(currentPrincipalEmail).orElse(null);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Income income = new Income(
                user,
                incomeRequest.getIncomeName(),
                LocalDate.parse(incomeRequest.getDate(), formatter),
                BigDecimal.valueOf(Double.parseDouble(incomeRequest.getAmount())));
        incomeRepository.save(income);
        return new IncomeResponse(
                income.getId().toString(),
                incomeRequest.getIncomeName(),
                incomeRequest.getDate(),
                incomeRequest.getAmount());
    }

    public IncomeResponse updateIncome(IncomeUpdateRequest incomeUpdateRequest) {
        String currentPrincipalEmail = getCurrentPrincipalEmail();
        Optional<User> user = userRepository.findByEmail(currentPrincipalEmail);
        if (user.isEmpty()) {
            throw new RuntimeException("User does not exist");
        }
        List<Income> userIncomes = getAllIncomeByUser(user.get().getId());
        Income updatingIncome = incomeRepository.getById(Long.valueOf(incomeUpdateRequest.getIncomeId()));
        if (!userIncomes.contains(updatingIncome)) {
            throw new RuntimeException("User has not this income");
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        updatingIncome.setIncomeName(incomeUpdateRequest.getIncomeName());
        updatingIncome.setDate(LocalDate.parse(incomeUpdateRequest.getDate(), formatter));
        updatingIncome.setAmount(BigDecimal.valueOf(Double.parseDouble(incomeUpdateRequest.getAmount())));
        incomeRepository.save(updatingIncome);
        return new IncomeResponse(
                updatingIncome.getId().toString(),
                incomeUpdateRequest.getIncomeName(),
                incomeUpdateRequest.getDate(),
                incomeUpdateRequest.getAmount());
    }

    public IncomeResponse deleteIncome(String id) {
        String currentPrincipalEmail = getCurrentPrincipalEmail();
        Optional<User> user = userRepository.findByEmail(currentPrincipalEmail);
        if (user.isEmpty()) {
            throw new RuntimeException("User does not exist");
        }
        List<Income> userIncomes = getAllIncomeByUser(user.get().getId());
        Income deletingIncome = incomeRepository.getById(Long.valueOf(id));
        if (!userIncomes.contains(deletingIncome)) {
            throw new RuntimeException("User has not this income");
        }
        incomeRepository.delete(deletingIncome);
        return null;
    }

    private String getCurrentPrincipalEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    public List<Income> getAllIncomeByUser(Long id) {
    	Optional<User> user = userRepository.findById(id);
    	return incomeRepository.findByUser(user);
    }
}
