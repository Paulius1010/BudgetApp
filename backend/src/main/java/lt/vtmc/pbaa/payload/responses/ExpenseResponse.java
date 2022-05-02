package lt.vtmc.pbaa.payload.responses;

public class ExpenseResponse {

    private String expenseId;

    private String expenseName;

    private Integer expenseCategoryId;

    private String date;

    private String amount;

    public ExpenseResponse() {
    }

    public ExpenseResponse(String expenseId, String expenseName, Integer expenseCategoryId, String date, String amount) {
        this.expenseId = expenseId;
        this.expenseName = expenseName;
        this.expenseCategoryId = expenseCategoryId;
        this.date = date;
        this.amount = amount;
    }

    public String getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(String expenseId) {
        this.expenseId = expenseId;
    }

    public String getExpenseName() {
        return expenseName;
    }

    public void setExpenseName(String expenseName) {
        this.expenseName = expenseName;
    }

    public Integer getExpenseCategoryId() {
        return expenseCategoryId;
    }

    public void setExpenseCategoryId(Integer expenseCategoryId) {
        this.expenseCategoryId = expenseCategoryId;
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

    @Override
    public String toString() {
        return "ExpenseResponse{" +
                "expenseId='" + expenseId + '\'' +
                ", expenseName='" + expenseName + '\'' +
                ", expenseCategory='" + expenseCategoryId + '\'' +
                ", date='" + date + '\'' +
                ", amount='" + amount + '\'' +
                '}';
    }
}
