package lt.vtmc.pbaa.services;

import lt.vtmc.pbaa.models.Expense;
import lt.vtmc.pbaa.models.ExpenseLimit;
import lt.vtmc.pbaa.models.ExpenseUnitStatistic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatisticsService {

    private final ExpenseService expenseService;
    private final ExpenseLimitService expenseLimitService;

    @Autowired
    public StatisticsService(ExpenseService expenseService, ExpenseLimitService expenseLimitService) {
        this.expenseService = expenseService;
        this.expenseLimitService = expenseLimitService;
    }


    public List<ExpenseUnitStatistic> getAllExpenseStatisticByUser(Long id) {
        List<Expense> allExpenses = expenseService.getAllExpenseByUser(id);
        List<Expense> thisMonthExpenses = allExpenses.stream().filter(expense -> !expense.getDate().isBefore(LocalDate.of(LocalDate.now().getYear(), LocalDate.now().getMonth(), 1))).collect(Collectors.toList());
        List<ExpenseLimit> limits = expenseLimitService.getAllExpenseLimitsByUser(id);
        List<ExpenseUnitStatistic> expenseUnitStatisticList = new ArrayList<>();
        for (ExpenseLimit limit : limits) {
            BigDecimal sumOfExpenseCategory = thisMonthExpenses.stream().filter(expense -> expense.getExpensesCategory().equals(limit.getExpensesCategory())).map(expense -> expense.getAmount()).reduce(BigDecimal.ZERO, BigDecimal::add);
            System.out.println(sumOfExpenseCategory);
            expenseUnitStatisticList.add(new ExpenseUnitStatistic(limit.getExpensesCategory(), sumOfExpenseCategory, limit.getAmount()));
        }
    return expenseUnitStatisticList;
    }
}
