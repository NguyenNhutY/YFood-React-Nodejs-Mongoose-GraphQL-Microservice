const createAccount = async () => {
  const newAccount = new Account({
    email: "test@example.com",
    password: "password123",
    role_Access: "customer",
  });

  try {
    const savedAccount = await newAccount.save();
    console.log("Tài khoản đã được tạo:", savedAccount);
  } catch (error) {
    console.error("Lỗi khi tạo tài khoản:", error);
  }
};

// Gọi hàm createAccount
createAccount();
