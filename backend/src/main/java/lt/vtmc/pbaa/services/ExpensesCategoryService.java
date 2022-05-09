package lt.vtmc.pbaa.services;

import lt.vtmc.pbaa.models.ExpensesCategory;
import lt.vtmc.pbaa.payload.requests.ExpensesCategoryInsertRequest;
import lt.vtmc.pbaa.payload.requests.ExpensesCategoryUpdateRequest;
import lt.vtmc.pbaa.payload.responses.ExpensesCategoryResponse;
import lt.vtmc.pbaa.repositories.ExpensesCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExpensesCategoryService {
    private final ExpensesCategoryRepository expensesCategoryRepository;

    @Autowired
    public ExpensesCategoryService(ExpensesCategoryRepository expensesCategoryRepository) {
        this.expensesCategoryRepository = expensesCategoryRepository;
    }

    public List<ExpensesCategoryResponse> getAllExpensesCategories() {
        return expensesCategoryRepository.findAll().stream().map(category -> new ExpensesCategoryResponse(category.getId(), category.getName())).collect(Collectors.toList());
    }

    public ExpensesCategoryResponse deleteExpensesCategory(Long id) {
        Optional<ExpensesCategory> deletingExpensesCategory = expensesCategoryRepository.findById(id);
        if (deletingExpensesCategory.isEmpty()) {
            throw new RuntimeException("Category does not exist");
        }
        expensesCategoryRepository.deleteById(id);
        return null;
    }

    public ExpensesCategoryResponse saveExpensesCategory(ExpensesCategoryInsertRequest expensesCategoryInsertRequest) {
        Optional<ExpensesCategory> expensesCategory = expensesCategoryRepository.findByName(expensesCategoryInsertRequest.getName());
        if (expensesCategory.isPresent()) {
            throw new RuntimeException("Category already exists");
        }
        ExpensesCategory newExpensesCategory = new ExpensesCategory(expensesCategoryInsertRequest.getName());
        expensesCategoryRepository.save(newExpensesCategory);
        return new ExpensesCategoryResponse(newExpensesCategory.getId(), newExpensesCategory.getName());
    }

    public ExpensesCategoryResponse updateExpensesCategory(ExpensesCategoryUpdateRequest expensesCategoryUpdateRequest) {
        ExpensesCategory expensesCategory = expensesCategoryRepository.getById(expensesCategoryUpdateRequest.getId());
        if (expensesCategory == null) {
            throw new RuntimeException("Category does not exist");
        }
        expensesCategory.setName(expensesCategoryUpdateRequest.getName());
        expensesCategoryRepository.save(expensesCategory);
        return new ExpensesCategoryResponse(expensesCategory.getId(), expensesCategory.getName());
    }

}
