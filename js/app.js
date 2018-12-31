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
    const calculatedAmountPerMonth = principal / calculatedMonths;
    const calculatedInterestPerMonth = calculatedAmountPerMonth * (calculatedInteresWithFixedPricingPerYear / 100);
    const calculatedAmountPerMonthWithInterest = parseFloat((calculatedAmountPerMonth + calculatedInterestPerMonth).toFixed(2));
    const calculatedTotalInterest = parseFloat((calculatedInterestPerMonth * calculatedMonths).toFixed(2));
    const calculatedTotalPayment = parseFloat((calculatedAmountPerMonthWithInterest * calculatedMonths).toFixed(2));


    if(monthlyPayment.value != "", totalPayment.value != "", totalInterest != ""){
        monthlyPayment.value = `${calculatedAmountPerMonthWithInterest}`;
        totalPayment.value = `${calculatedTotalPayment}`;
        totalInterest.value = `${calculatedTotalInterest}`;

        document.getElementById('desired-loan-result').classList.add('show');
    }
}