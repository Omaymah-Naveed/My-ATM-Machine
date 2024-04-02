#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 20000;
let myPinCode = 3322;
// WELCOME MESSAGE
console.log(chalk.blueBright("\n \t Welcome to ATM Machine \n"));
let pinAns = await inquirer.prompt([
    {
        name: "PinCode",
        type: "number",
        message: chalk.yellow("Enter your Pin Code: ")
    }
]);
if (pinAns.PinCode === myPinCode) {
    console.log(chalk.green("\n Pin is Correct..! \n"));
    // console.log(`Current Account Balance is ${myBalance}`)
    let operationAns = await inquirer.prompt([
        {
            name: "Operation",
            type: "list",
            message: "Select Operation:",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.Operation === "Withdraw Amount") {
        let withDrawAns = await inquirer.prompt([
            {
                name: "WithdrawMethod",
                type: "list",
                message: "Select A Withdrawl Method: ",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withDrawAns.WithdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 3000, 5000, 10000, 12000, 15000, 18000, 20000, 25000, 30000, 50000, 60000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance.!"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.greenBright(`\n ${fastCashAns.fastCash} withdraw Successfully..! \n`));
                console.log(`\n Your remaining Balance is: ${myBalance} \n`);
            }
        }
        else if (withDrawAns.WithdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "Amount",
                    type: "number",
                    message: "Enter the amount to Withdraw:"
                }
            ]);
            if (amountAns.Amount > myBalance) {
                console.log(chalk.red("Insufficient Balance.!"));
            }
            else {
                myBalance -= amountAns.Amount;
                console.log(chalk.greenBright(`\n ${amountAns.Amount} Withdraw Successful..! \n`));
                console.log(`\n Your Remaining Balance is: ${myBalance} \n`);
            }
        }
    }
    else if (operationAns.Operation === "Check Balance") {
        console.log(chalk.greenBright(`\n Your Account Balance is: ${myBalance} \n`));
    }
}
else {
    console.log(chalk.red("Pin is Incorrect. Try Again.!"));
}
