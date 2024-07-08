const Transaction = require("../models/transaction.model");
const Wallet = require("../models/wallet.model");
const Budget = require("../models/budget.model");
const User = require("../models/user.model");
const fileService = require("./file.service");

// Cüzdan bilgilerini getir (id ile) (getWalletBYId)
// Cüzdanı sil (deleteWallet)
// Cüzdanın bakiyesini kontrol et (checkBalance)
// Cüzdanın bakiyesini güncelle (decreaseBalance)
// Cüzdanın bakiyesini güncelle (increaseBalance)
// Cüzdan silindiğinde cüzdana ait tüm işlemleri sil (deleteTransactions)
// Cüzdan silindiğinde cüzdanın sahibine ait tüm bütçeleri sil (deleteBudgetsByUserId)
// Cüzdan silindiğinde cüzdanın sahibine ait tüm işlemleri sil (deleteTransactionsByUserId)
// Cüzdan renklerini getir (getColors)
// Cüzdan renklerini güncelle (updateColor)
// Cüzdan logolarını güncelle (updateLogo)
// Cüzdan currency'lerini getir (getCurrencies)
// Cüzdan currency'lerini güncelle (updateCurrency)
// Cüzdan isDefault bilgisini güncelle (updateIsDefault)
// Cüzdan isDefault bilgisini getir (getIsDefault)
// Cüzdanın sahibine ait tüm cüzdanları sil (deleteWalletsByUserId)
// Cüzdanın işlemlerini getir (getTransactionsByWalletId)

exports.updateWallet = async (req) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;
    const updateWallets = await Wallet.findByIdAndUpdate({
      id,
      name: name,
      color: color,
    });
    return updateWallets;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateBalance = async (req) => {
  try {
    const { id } = req.params;
    const { newBalance } = req.body;

    const wallet = await Wallet.findById(id);
    if (!wallet) {
      throw new Error("Cüzdan bulunamadı.");
    }
    wallet.balance = newBalance;
    await wallet.save();
    return wallet;
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.deleteBudgets = async (req) => {
  try {
    const { id } = req.params;
    // Cüzdanı bulun
    const wallet = await Wallet.findById(id);
    if (!wallet) {
      throw new Error("Cüzdan bulunamadı.");
    }
    // Cüzdan sahibinin ID'sini alın
    const ownerId = wallet.user;
    // Sahibe ait tüm bütçeleri silin
    await Budget.deleteMany({ user: ownerId });
    return "Cüzdan ile ilgili bütçeler başarıyla silindi.";
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.deleteTransactionsByWalletIdAndUserId = async (req) => {
  try {
    const { walletId, userId } = req.params;
    // Veritabanından ilgili walletId ve userId'ye göre işlemleri sil
    await Transaction.deleteMany({
      wallet: walletId,
      user: userId,
    });
    return "başarıyla silindi.";
  } catch (error) {
    throw new Error("İşlemler silinirken hata oluştu");
  }
};
exports.getLogos = async (req) => {
  try {
    const { userId } = req.params;
    const wallets = await Wallet.find({ user: userId });
    let logos = [];
    wallets.forEach((wallet) => {
      logos.push(wallet.logo);
    });
    return logos;
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.updateLogo = async (req) => {
  try {
    const { walletId } = req.params; // request parametresinden walletId'yi alın
    const logoUrl = await fileService.uploadImage(req, res); // Resmi yükleyin ve URL'sini alın
    const updatedWallet = await Wallet.findByIdAndUpdate(
      walletId,
      { logo: logoUrl }, // logo alanını güncelleyin
      { new: true } // Güncellenmiş dokümanı döndürmek için new: true kullanın
    );
    return updatedWallet;
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.getWalletsByUserId = async (req) => {
  try {
    const { userId } = req.params;
    const wallets = await Wallet.find({ user: userId });
    if (wallets === null || wallets.length === 0) {
      throw new Error("böyle bir cüzdan bulunamadı");
    } else {
      return wallets;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.createWallet = async (req) => {
  try {
    let { userıd, name, currency, color, isDefault } = req.body;
    const user = await User.findById(user);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı.");
    }
    const existWallet = await Wallet.find({ name });
    if (existWallet.length > 0) {
      throw new Error("Bu cüzdan adı zaten var. Lütfen başka bir ad seçin.");
    }
    const wallet = new Wallet({
      user: userıd,
      name,
      currency,
      color,
      isDefault,
      balance: 0,
    });
    await wallet.save();
    return wallet;
  } catch (error) {
    throw new Error(error.message);
  }
};
