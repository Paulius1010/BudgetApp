package lt.vtmc.pbaa.payload.requests;

import javax.validation.constraints.NotBlank;


public class IncomeRequest {

    @NotBlank
    private String userToken;

    @NotBlank
    private String incomeName;

    @NotBlank
    private String date;

    @NotBlank
    private String amount;


    public String getUserToken() {
        return userToken;
    }

    public String getIncomeName() {
        return incomeName;
    }

    public String getDate() {
        return date;
    }


    public String getAmount() {
        return amount;
    }


    @Override
    public String toString() {
        return "IncomeRequest{" +
                ", incomeName='" + incomeName + '\'' +
                ", date='" + date + '\'' +
                ", amount='" + amount + '\'' +
                '}';
    }
}
