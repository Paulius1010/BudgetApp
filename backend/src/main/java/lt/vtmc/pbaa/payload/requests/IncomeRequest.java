package lt.vtmc.pbaa.payload.requests;

import javax.validation.constraints.NotBlank;


public class IncomeRequest {

    @NotBlank
    private String userId;

    @NotBlank
    private String incomeName;

    @NotBlank
    private String date;

    @NotBlank
    private String amount;

    public IncomeRequest() {
    }

    public IncomeRequest(String userId, String incomeName, String date, String amount) {
        this.userId = userId;
        this.incomeName = incomeName;
        this.date = date;
        this.amount = amount;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
