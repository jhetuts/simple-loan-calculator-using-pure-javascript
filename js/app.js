const loader = document.getElementById('loader');

document.getElementById('desired-loan-amount').addEventListener('submit', calculateResults);
document.addEventListener('click', function(e){
    if(e.target.classList.contains('btn-link')){
        document.getElementById('desired-loan-result').classList.remove('show');
    }
});
function calculateResults(e){
    e.preventDefault();

    // Inputs
    const amount = document.getElementById('loan-amount');
    const repaymentPeriod = document.getElementById('repayment-period');
    const fixedPricingPeriod = document.getElementById('fixed-payment-period');

    // Outputs
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    // Variables
    const principal = parseFloat(amount.value);
    const calculatedYear = parseFloat(repaymentPeriod.value);
    const calculatedMonths = parseFloat(repaymentPeriod.value) * 12;
    const calculatedInterest = parseFloat(fixedPricingPeriod.value.split(", ")[1]);
    const calculatedFixedYearlyInterest = parseFloat(fixedPricingPeriod.value.split(", ")[0]);
    const calculatedInteresWithFixedPricingPerYear = (parseFloat(repaymentPeriod.value) / calculatedFixedYearlyInterest) * calculatedInterest;

    // Calculated Variables
    const calculatedAmountPerMonth = parseFloat(principal / calculatedMonths);
    const calculatedInterestPerMonth = parseFloat(calculatedAmountPerMonth * (calculatedInteresWithFixedPricingPerYear / 100));
    const calculatedAmountPerMonthWithInterest = parseFloat((calculatedAmountPerMonth + calculatedInterestPerMonth));
    const calculatedTotalInterest = parseFloat(calculatedInterestPerMonth * calculatedMonths);
    const calculatedTotalPayment = parseFloat((calculatedAmountPerMonthWithInterest * calculatedMonths));


    if(monthlyPayment.value != "", totalPayment.value != "", totalInterest != ""){
        let error = "";
        if(isFinite(principal)){
            if(principal < 5000){
                error = 'Minimum of Php 5,000.00 loan amount.';
                document.getElementById('desired-loan-result').classList.remove('show');
                showError(error);
            } else if (principal > 6000000){
                error = 'Maximum of Php 6,000,000.00 loan amount.';

                document.getElementById('desired-loan-result').classList.remove('show');
                showError(error);
            } else {

                document.getElementById('desired-loan-result').classList.remove('show');

                loader.classList.add('show');
                setTimeout(removeLoader, 2000);

                monthlyPayment.value = `${calculatedAmountPerMonthWithInterest.toFixed(2)}`;
                totalPayment.value = `${calculatedTotalPayment.toFixed(2)}`;
                totalInterest.value = `${calculatedTotalInterest.toFixed(2)}`;
            }
            
        } else {
            error = 'Please check your input amount!';
        }
    }
}

function showError(error){
    const divError = document.createElement('div');
    const loanCard = document.querySelector('#loan-calculator .card');
    const loanCardHeader = document.querySelector('#loan-accordion');

    divError.classList = "alert alert-danger";
    divError.appendChild(document.createTextNode(error));

    console.log(loanCardHeader)

    loanCard.insertBefore(divError, loanCardHeader);

    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector('.alert').remove();
}
function removeLoader(){
    loader.classList.remove('show');
    document.getElementById('desired-loan-result').classList.add('show');
}