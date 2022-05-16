package lt.vtmc.pbaa.services;

import lt.vtmc.pbaa.models.ExpenseLimit;
import lt.vtmc.pbaa.models.ExpensesCategory;
import lt.vtmc.pbaa.models.User;
import lt.vtmc.pbaa.payload.requests.ExpenseLimitInsertRequest;
import lt.vtmc.pbaa.payload.responses.ExpenseLimitResponse;
import lt.vtmc.pbaa.repositories.ExpensesCategoryRepository;
import lt.vtmc.pbaa.repositories.ExpensesLimitsRepository;
import lt.vtmc.pbaa.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseLimitService {
    private final ExpensesLimitsRepository expensesLimitsRepository;
    private final UserRepository userRepository;
    private final ExpensesCategoryRepository expensesCategoryRepository;

    @Autowired
    public ExpenseLimitService(ExpensesLimitsRepository expensesLimitsRepository, UserRepository userRepository, ExpensesCategoryRepository expensesCategoryRepository) {
        this.expensesLimitsRepository = expensesLimitsRepository;
        this.userRepository = userRepository;
        this.expensesCategoryRepository = expensesCategoryRepository;
    }

    public ExpenseLimitResponse saveExpenseLimit(ExpenseLimitInsertRequest expenseLimitInsertRequest) {
        String currentPrincipalEmail = getCurrentPrincipalEmail();
        User user = userRepository.findByEmail(currentPrincipalEmail).orElse(null);
        ExpensesCategory expenseCategory = expensesCategoryRepository.getById(expenseLimitInsertRequest.getCategoryId());
        ExpenseLimit expenseLimit = new ExpenseLimit(
                user,
                expenseCategory,
                BigDecimal.valueOf(Double.parseDouble(expenseLimitInsertRequest.getLimit())));
        expensesLimitsRepository.save(expenseLimit);
        return new ExpenseLimitResponse(
                expenseLimit.getId(),
                expenseLimitInsertRequest.getCategoryId(),
                expenseLimitInsertRequest.getLimit());
    }



    private String getCurrentPrincipalEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    public List<ExpenseLimit> getAllExpenseLimitsByUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        return expensesLimitsRepository.findByUser(user);
    }
}
