package lt.vtmc.pbaa.controllers;

import lt.vtmc.pbaa.models.Income;
import lt.vtmc.pbaa.payload.requests.IncomeInsertRequest;
import lt.vtmc.pbaa.payload.requests.IncomeUpdateRequest;
import lt.vtmc.pbaa.payload.responses.IncomeResponse;
import lt.vtmc.pbaa.services.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public IncomeResponse insertIncome(@RequestBody IncomeInsertRequest incomeRequest) {
		return this.incomeService.saveIncome(incomeRequest);
	}

//	@PutMapping
//	@ResponseStatus(HttpStatus.OK)
//	public IncomeResponse updateIncome(@RequestBody IncomeUpdateRequest incomeUpdateRequest) {
//		return this.incomeService.updateIncome(incomeUpdateRequest);
//	}
//
//	@DeleteMapping
//	@ResponseStatus(HttpStatus.OK)
//	public IncomeResponse updateIncome(@RequestBody IncomeUpdateRequest incomeUpdateRequest) {
//		return this.incomeService.deleteIncome(incomeUpdateRequest);
//	}

}
