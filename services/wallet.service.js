const Transaction = require("../models/transaction.model");
const Wallet = require("../models/wallet.model");
const Budget = require("../models/budget.model");
const User = require("../models/user.model");
const fileService = require("./file.service");

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

exports.getWalletById = async (req) => {
  try {
    const { walletId } = req.params;
    const wallet = await Wallet.find({ wallet: walletId });
    if (wallet === null || wallet.length === 0) {
      throw new Error("Böyle bir cüzdan bulunamadı!");
    } else {
      return wallet;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

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

exports.deleteWallet = async (req) => {
  try {
    const { id } = req.params;
    const wallet = await Wallet.findById(id);
    if (!wallet) {
      throw new Error("Cüzdan bulunamadı.");
    }
    await Transaction.deleteMany({
      wallet: id,
    });
    await Wallet.deleteMany({ wallet: id });
    return "Cüzdan başariyla silindi.";
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteTransactionsByWalletId = async (req) => {
  try {
    const { walletId } = req.params;
    const wallet = await Wallet.findById(walletId);
    if (!wallet) {
      throw new Error("Cüzdan bulunamadı.");
    }
    await Transaction.deleteMany({
      wallet: walletId,
    });
    return "basariyla silindi.";
  } catch (error) {
    throw new Error("Silme islemi gerceklestirilemedi");
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

exports.updateColor = async (req) => {
  try {
    const { walletId, newColor } = req.params;
    const updatedColor = await Wallet.findByIdAndUpdate(
      walletId,
      { color: newColor },
      { new: true }
    );
    return updatedColor;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteWalletsByUserId = async (req) => {
  try {
    const { userId } = req.params;
    //kullanıcıyı sorgulayın
    const user = await User.find({ user: userId });
    if (user === null || user.length === 0) {
      throw new Error("Boyle bir kullanici bulunamadi");
    }
    const wallets = await Wallet.find({ user: userId });
    if (wallets === null || wallets.length === 0) {
      throw new Error("böyle bir cüzdan bulunamadı");
    } else {
      await Transaction.deleteMany({
        user: userId,
      });
      await Wallet.deleteMany({ user: userId });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getTransactionsByWalletId = async (req) => {
  try {
    const { walletId } = req.params;
    // cüzdan var mı diye kontrol et
    const wallet = await Wallet.findById(walletId);
    if (wallet === null || wallet.length === 0) {
      throw new Error("boyle bir cüzdan bulunamadi");
    }
    const transactions = await Transaction.find({ wallet: walletId });
    if (transactions === null || transactions.length === 0) {
      throw new Error("boyle bir islem bulunamadi");
    } else {
      return transactions;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getWalletByUserId = async (req) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı.");
    }
    const wallets = await Wallet.find({ user: userId });
    return wallets;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Cüzdanın bakiyesini kontrol et (checkBalance) - Mehmet cüzdanı find ile bulup balance bilgisini geri döndürecek
// Cüzdanın bakiyesini güncelle (decreaseBalance) - Mehmet cüzdanın id bilgisi ile miktar bilgisini paramstan alıp bakiyesini güncelleyecek
// Cüzdanın bakiyesini güncelle (increaseBalance) - Mehmet
// Cüzdan renklerini getir (getColors) - Mehmet
// Cüzdan isDefault bilgisini getir (getIsDefault) - Mehmet
// Cüzdan currency'lerini getir (getCurrencies) - Ekrem
// Cüzdan currency'lerini güncelle (updateCurrency) - Taha
// Cüzdan isDefault bilgisini güncelle (updateIsDefault) - Ekrem
