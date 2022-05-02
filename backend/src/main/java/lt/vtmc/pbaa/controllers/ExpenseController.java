package lt.vtmc.pbaa.controllers;

import lt.vtmc.pbaa.models.Expense;
import lt.vtmc.pbaa.payload.requests.ExpenseInsertRequest;
import lt.vtmc.pbaa.payload.requests.ExpenseUpdateRequest;
import lt.vtmc.pbaa.payload.responses.ExpenseResponse;
import lt.vtmc.pbaa.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/expense")
public class ExpenseController {

    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService ) {
        this.expenseService = expenseService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExpenseResponse insertExpense(@RequestBody ExpenseInsertRequest expenseInsertRequest) {
        return this.expenseService.saveExpense(expenseInsertRequest);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public ExpenseResponse updateExpense(@RequestBody ExpenseUpdateRequest expenseUpdateRequest) {
        return this.expenseService.updateExpense(expenseUpdateRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ExpenseResponse deleteExpense(@PathVariable String id) {
        return this.expenseService.deleteExpense(id);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Expense>> getAllExpensesByUserId(@PathVariable Long id) {
        return ResponseEntity.ok().body(this.expenseService.getAllExpenseByUser(id));
    }
}
