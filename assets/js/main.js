$(document).ready(function () {
    $('#empSalaryTable').DataTable({
      // set default sort by slary, desc
      "order": [[ 5, "desc" ]],
      'paging': false
    });
    $('.dataTables_length').addClass('bs-select');

    // get all salaries and sum them and place into 'Total Salary'
    var salarySum = 0;
    var $tblrows = $("#empSalaryTable tbody tr");
    $tblrows.each(function (index) {
      var $tblrow = $(this);
      var empSalary = $tblrow.find('.salary').text();
      empSalary = empSalary.replace(/,/gi, '');

      salarySum = salarySum + parseFloat(empSalary);
    });
    // log the math to the console
    console.log('Total of Salaries: ' + salarySum);

    // dynamically place total of salaries in specific cell
    $('.salary-total').html( formatMoney(salarySum) );
});

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};
