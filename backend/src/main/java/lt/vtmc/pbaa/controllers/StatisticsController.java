package lt.vtmc.pbaa.controllers;

import lt.vtmc.pbaa.models.Expense;
import lt.vtmc.pbaa.models.ExpenseUnitStatistic;
import lt.vtmc.pbaa.services.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @Autowired
    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<ExpenseUnitStatistic>> getAllExpensesStatisticsByUserId(@PathVariable Long id) {
        return ResponseEntity.ok().body(this.statisticsService.getAllExpenseStatisticByUser(id));
    }
}
