const Transaction = require("../models/transaction.model");
const Wallet = require("../models/wallet.model");
const Budget = require("../models/budget.model");

// Cüzdan oluştur ve kaydet (createWallet)
// Cüzdan bilgilerini getir (id ile) (getWalletBYId)
// Cüzdan bilgilerini getir (user id ile) (getWalletByUserId)
// Cüzdan bilgilerini güncelle (updateWallet)
// Cüzdanı sil (deleteWallet)
// Cüzdanın bakiyesini güncelle (updateBalance)
// Cüzdanın bakiyesini kontrol et (checkBalance)
// Cüzdanın bakiyesini güncelle (decreaseBalance)
// Cüzdanın bakiyesini güncelle (increaseBalance)
// Cüzdan silindiğinde cüzdana ait tüm işlemleri sil (deleteTransactions)
// Cüzdan silindiğinde cüzdana ait tüm bütçeleri sil (deleteBudgets)
// Cüzdan silindiğinde cüzdanın sahibine ait tüm bütçeleri sil (deleteBudgetsByUserId)
// Cüzdan silindiğinde cüzdanın sahibine ait tüm işlemleri sil (deleteTransactionsByUserId)
// Cüzdan silindiğinde cüzdanın sahibine ait tüm işlemleri sil (deleteTransactionsByWalletId)
// Cüzdan silindiğinde cüzdanın sahibine ait tüm işlemleri sil (deleteTransactionsByWalletIdAndUserId)
// Cüzdan renklerini getir (getColors)
// Cüzdan logolarını getir (getLogos)
// Cüzdan renklerini güncelle (updateColor)
// Cüzdan logolarını güncelle (updateLogo)
// Cüzdan currency'lerini getir (getCurrencies)
// Cüzdan currency'lerini güncelle (updateCurrency)
// Cüzdan isDefault bilgisini güncelle (updateIsDefault)
// Cüzdan isDefault bilgisini getir (getIsDefault)
// Cüzdanın sahibine ait tüm cüzdanları getir (getWalletsByUserId)
// Cüzdanın sahibine ait tüm cüzdanları sil (deleteWalletsByUserId)
// Cüzdanın işlemlerini getir (getTransactionsByWalletId)