package lt.vtmc.pbaa.security.services;

import lt.vtmc.pbaa.models.Income;
import lt.vtmc.pbaa.models.User;
import lt.vtmc.pbaa.payload.requests.IncomeRequest;
import lt.vtmc.pbaa.payload.responses.IncomeResponse;
import lt.vtmc.pbaa.repositories.IncomeRepository;
import lt.vtmc.pbaa.repositories.UserRepository;
import lt.vtmc.pbaa.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class IncomeService {
    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    @Autowired
    public IncomeService(IncomeRepository incomeRepository, UserRepository userRepository, JwtUtils jwtUtils) {
        this.incomeRepository = incomeRepository;
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

   public List<Income> getAllIncomes() {
        return incomeRepository.findAll();
   }

    public IncomeResponse saveIncome(IncomeRequest incomeRequest) {
        User user = userRepository.findById(jwtUtils.getUserIdFromJwtToken(incomeRequest.getUserToken())).orElse(null);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Income income = new Income(
                user,
                incomeRequest.getIncomeName(),
                LocalDate.parse(incomeRequest.getDate(), formatter),
                BigDecimal.valueOf(Double.parseDouble(incomeRequest.getAmount())));
        incomeRepository.save(income);
        return new IncomeResponse(
                incomeRequest.getIncomeName(),
                incomeRequest.getDate(),
                incomeRequest.getAmount());
    }
}
