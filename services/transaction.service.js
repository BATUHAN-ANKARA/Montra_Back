const Transaction = require("../models/transaction.model");
const Wallet = require("../models/wallet.model");
const Budget = require("../models/budget.model");

// Transaction ekleme işlemi (addTransaction)
// Transaction listeleme (tüm) işlemi (getAllTransactions)
// Transaction listeleme (tek id ile) işlemi (getTransactionById)
// Transaction listeleme (user id ile) işlemi (getTransactionByUserId)
// Transaction listeleme (wallet id ile) işlemi (getTransactionByWalletId)
// Transaction listeleme (budget id ile) işlemi (getTransactionByBudgetId)
// Transaction güncelleme işlemi (updateTransactionById)
// Transaction silme işlemi (id ile) işlemi (deleteTransactionById)
// Tüm transactionları silme işlemi (tüm) işlemi (deleteAllTransactions)
// Tüm transactionları silme işlemi (user id ile) işlemi (deleteAllTransactionsByUserId)
// Tüm transactionları silme işlemi (wallet id ile) işlemi (deleteAllTransactionsByWalletId)
// Tüm transactionları silme işlemi (budget id ile) işlemi (deleteAllTransactionsByBudgetId)
// Transaction listeleme (type ile) işlemi (getTransactionByType)
// Transaction listeleme (amount ile) işlemi (getTransactionByAmount)
// Transaction listeleme (date ile) işlemi (getTransactionByDate)
// Transaction listeleme (description ile) işlemi (getTransactionByDescription)
// Transaction listeleme (category ile) işlemi (getTransactionByCategory)
// Transaction listeleme (currency ile) işlemi (getTransactionByCurrency)
// Transaction listeleme (from ile) işlemi (getTransactionByFrom)
// Transaction listeleme (to ile) işlemi (getTransactionByTo)
// Transaction listeleme (filter ile) işlemi (getTransactionByFilter)
// Transaction listeleme (filter ve sort ile) işlemi (getTransactionByFilterAndSort)
// Transaction listeleme (filter, sort ve pagination ile) işlemi (getTransactionByFilterSortAndPagination)