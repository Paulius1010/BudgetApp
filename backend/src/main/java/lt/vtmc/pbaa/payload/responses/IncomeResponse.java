package lt.vtmc.pbaa.payload.responses;

import javax.validation.constraints.NotBlank;

public class IncomeResponse {

    @NotBlank
    private String incomeName;

    @NotBlank
    private String date;

    @NotBlank
    private String amount;

    public IncomeResponse() {
    }

    public IncomeResponse(String incomeName, String date, String amount) {
        this.incomeName = incomeName;
        this.date = date;
        this.amount = amount;
    }


    public String getIncomeName() {
        return incomeName;
    }

    public void setIncomeName(String incomeName) {
        this.incomeName = incomeName;
    }

    public String getDate() {
        return date;
    }


    public void setDate(String date) {
        this.date = date;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }
}
