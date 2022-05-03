package lt.vtmc.pbaa.services;

import lt.vtmc.pbaa.models.Expense;
import lt.vtmc.pbaa.models.ExpensesCategory;
import lt.vtmc.pbaa.models.User;
import lt.vtmc.pbaa.payload.requests.ExpenseInsertRequest;
import lt.vtmc.pbaa.payload.requests.ExpenseUpdateRequest;
import lt.vtmc.pbaa.payload.responses.ExpenseResponse;
import lt.vtmc.pbaa.repositories.ExpenseRepository;
import lt.vtmc.pbaa.repositories.ExpensesCategoryRepository;
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
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final ExpensesCategoryRepository expensesCategoryRepository;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository, UserRepository userRepository, ExpensesCategoryRepository expensesCategoryRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
        this.expensesCategoryRepository = expensesCategoryRepository;
    }

    public ExpenseResponse saveExpense(ExpenseInsertRequest expenseInsertRequest) {
        String currentPrincipalEmail = getCurrentPrincipalEmail();
        User user = userRepository.findByEmail(currentPrincipalEmail).orElse(null);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        ExpensesCategory expenseCategory = expensesCategoryRepository.getById(expenseInsertRequest.getCategoryId());
        Expense expense = new Expense(
                user,
                expenseCategory,
                expenseInsertRequest.getExpenseName(),
                LocalDate.parse(expenseInsertRequest.getDate(), formatter),
                BigDecimal.valueOf(Double.parseDouble(expenseInsertRequest.getAmount())));
        expenseRepository.save(expense);
        return new ExpenseResponse(
                expense.getId(),
                expenseInsertRequest.getExpenseName(),
                expenseInsertRequest.getCategoryId(),
                expenseInsertRequest.getDate(),
                expenseInsertRequest.getAmount());
    }

    public ExpenseResponse updateExpense(ExpenseUpdateRequest expenseUpdateRequest) {
        String currentPrincipalEmail = getCurrentPrincipalEmail();
        Optional<User> user = userRepository.findByEmail(currentPrincipalEmail);
        if (user.isEmpty()) {
            throw new RuntimeException("User does not exist");
        }
        List<Expense> userIncomes = getAllExpenseByUser(user.get().getId());
        Expense updatingExpense = expenseRepository.getById(expenseUpdateRequest.getExpenseId());
        if (!userIncomes.contains(updatingExpense)) {
            throw new RuntimeException("User has not this income");
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        updatingExpense.setExpenseName(expenseUpdateRequest.getExpenseName());
        updatingExpense.setExpensesCategory(expensesCategoryRepository.getById(expenseUpdateRequest.getCategoryId()));
        updatingExpense.setDate(LocalDate.parse(expenseUpdateRequest.getDate(), formatter));
        updatingExpense.setAmount(BigDecimal.valueOf(Double.parseDouble(expenseUpdateRequest.getAmount())));
        expenseRepository.save(updatingExpense);
        return new ExpenseResponse(
                updatingExpense.getId(),
                expenseUpdateRequest.getExpenseName(),
                expenseUpdateRequest.getCategoryId(),
                expenseUpdateRequest.getDate(),
                expenseUpdateRequest.getAmount());
    }

    public ExpenseResponse deleteExpense(Long id) {
        String currentPrincipalEmail = getCurrentPrincipalEmail();
        Optional<User> user = userRepository.findByEmail(currentPrincipalEmail);
        if (user.isEmpty()) {
            throw new RuntimeException("User does not exist");
        }
        List<Expense> userExpenses = getAllExpenseByUser(user.get().getId());
        Expense deletingExpense = expenseRepository.getById(id);
        if (!userExpenses.contains(deletingExpense)) {
            throw new RuntimeException("User has not this expense");
        }
        expenseRepository.delete(deletingExpense);
        return null;
    }

    private String getCurrentPrincipalEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    public List<Expense> getAllExpenseByUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        return expenseRepository.findByUser(user);
    }
}
