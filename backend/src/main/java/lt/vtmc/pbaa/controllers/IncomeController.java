package lt.vtmc.pbaa.controllers;

import lt.vtmc.pbaa.models.Income;
import lt.vtmc.pbaa.security.services.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/income")
public class IncomeController {
    private final IncomeService incomeService;

    @Autowired
    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @GetMapping
    public List<Income> getAllIncome() {
        return this.incomeService.getAllIncomes();
    }
}
