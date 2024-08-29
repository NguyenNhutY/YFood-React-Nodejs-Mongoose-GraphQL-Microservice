// Định nghĩa interface cho các tùy chọn trong từng bước
interface Option {
  value: string;
  label: string;
  trigger: string;
}

// Định nghĩa interface cho từng bước của chatbot
interface ChatBoxStep {
  id: string;
  message?: string;
  user?: boolean;
  options?: Option[];
  trigger?: string;
  end?: boolean;
}

// Khai báo dbChatBoxSteps với kiểu dữ liệu là mảng của ChatBoxStep
export const dbChatBoxSteps: ChatBoxStep[] = [
  {
    id: "Greet",
    message: "Xin chào, chào mừng bạn đến với YFood!",
    trigger: "Ask Name",
  },
  {
    id: "Ask Name",
    message: "Vui lòng nhập tên của bạn:",
    trigger: "waiting",
  },
  {
    id: "waiting",
    user: true,
    trigger: "Name",
  },
  {
    id: "Name",
    message: "Chào {previousValue}, bạn cần hỗ trợ về vấn đề gì?",
    trigger: "issues",
  },
  {
    id: "issues",
    options: [
      { value: "account", label: "Tài khoản", trigger: "account" },
      { value: "order", label: "Đơn hàng", trigger: "order" },
      { value: "payment", label: "Thanh toán", trigger: "payment" },
      { value: "product", label: "Thông tin sản phẩm", trigger: "product" },
      { value: "shipping", label: "Vận chuyển", trigger: "shipping" },
      { value: "promotion", label: "Ưu đãi", trigger: "promotion" },
      { value: "feedback", label: "Phản hồi", trigger: "feedback" },
      { value: "technical", label: "Hỗ trợ kỹ thuật", trigger: "technical" },
      {
        value: "returnPolicy",
        label: "Chính sách hoàn trả",
        trigger: "returnPolicy",
      },
      { value: "vip", label: "Tài khoản VIP", trigger: "vip" },
      { value: "stores", label: "Thông tin cửa hàng", trigger: "stores" },
    ],
  },
  {
    id: "account",
    message: "Bạn cần hỗ trợ về tài khoản? Vui lòng chọn vấn đề cụ thể:",
    trigger: "accountIssues",
  },
  {
    id: "accountIssues",
    options: [
      { value: "login", label: "Đăng nhập", trigger: "login" },
      { value: "signup", label: "Đăng ký", trigger: "signup" },
      { value: "password", label: "Quên mật khẩu", trigger: "password" },
      {
        value: "update",
        label: "Cập nhật thông tin",
        trigger: "updateAccount",
      },
    ],
  },
  {
    id: "login",
    message:
      "Bạn gặp vấn đề khi đăng nhập. Vui lòng kiểm tra thông tin đăng nhập hoặc thử đặt lại mật khẩu.",
    end: true,
  },
  {
    id: "signup",
    message:
      "Bạn cần hỗ trợ đăng ký tài khoản. Vui lòng điền đầy đủ thông tin cần thiết trong biểu mẫu đăng ký.",
    end: true,
  },
  {
    id: "password",
    message:
      "Bạn quên mật khẩu. Vui lòng sử dụng chức năng 'Quên mật khẩu' để đặt lại mật khẩu của bạn.",
    end: true,
  },
  {
    id: "updateAccount",
    message:
      "Bạn có thể cập nhật thông tin tài khoản trong phần 'Thông tin tài khoản' trên trang web của chúng tôi.",
    end: true,
  },
  {
    id: "order",
    message: "Bạn cần hỗ trợ về đơn hàng? Vui lòng chọn vấn đề cụ thể:",
    trigger: "orderIssues",
  },
  {
    id: "orderIssues",
    options: [
      { value: "tracking", label: "Theo dõi đơn hàng", trigger: "tracking" },
      { value: "cancel", label: "Hủy đơn hàng", trigger: "cancel" },
      { value: "change", label: "Thay đổi đơn hàng", trigger: "change" },
    ],
  },
  {
    id: "tracking",
    message: "Để theo dõi đơn hàng của bạn, vui lòng nhập mã đơn hàng.",
    end: true,
  },
  {
    id: "cancel",
    message:
      "Để hủy đơn hàng, vui lòng liên hệ với bộ phận chăm sóc khách hàng của chúng tôi qua số điện thoại hoặc email.",
    end: true,
  },
  {
    id: "change",
    message:
      "Để thay đổi đơn hàng, vui lòng liên hệ với bộ phận chăm sóc khách hàng của chúng tôi qua số điện thoại hoặc email.",
    end: true,
  },
  {
    id: "payment",
    message: "Bạn cần hỗ trợ về thanh toán? Vui lòng chọn vấn đề cụ thể:",
    trigger: "paymentIssues",
  },
  {
    id: "paymentIssues",
    options: [
      { value: "method", label: "Phương thức thanh toán", trigger: "method" },
      { value: "failed", label: "Thanh toán thất bại", trigger: "failed" },
    ],
  },
  {
    id: "method",
    message:
      "Chúng tôi hỗ trợ các phương thức thanh toán như thẻ tín dụng, chuyển khoản và ví điện tử.",
    end: true,
  },
  {
    id: "failed",
    message:
      "Nếu thanh toán thất bại, vui lòng kiểm tra lại thông tin thẻ hoặc liên hệ ngân hàng của bạn.",
    end: true,
  },
  {
    id: "product",
    message: "Bạn cần biết thông tin về sản phẩm? Vui lòng chọn loại sản phẩm:",
    trigger: "productIssues",
  },
  {
    id: "productIssues",
    options: [
      { value: "details", label: "Chi tiết sản phẩm", trigger: "details" },
      {
        value: "availability",
        label: "Tình trạng hàng",
        trigger: "availability",
      },
      { value: "allergy", label: "Thông tin dị ứng", trigger: "allergy" },
    ],
  },
  {
    id: "details",
    message: "Bạn có thể xem chi tiết sản phẩm trên trang sản phẩm tương ứng.",
    end: true,
  },
  {
    id: "availability",
    message:
      "Vui lòng kiểm tra tình trạng hàng trên trang sản phẩm hoặc liên hệ với chúng tôi để biết thêm chi tiết.",
    end: true,
  },
  {
    id: "allergy",
    message:
      "Thông tin dị ứng có sẵn trong phần mô tả chi tiết của từng sản phẩm.",
    end: true,
  },
  {
    id: "shipping",
    message: "Bạn cần hỗ trợ về vận chuyển? Vui lòng chọn vấn đề cụ thể:",
    trigger: "shippingIssues",
  },
  {
    id: "shippingIssues",
    options: [
      { value: "time", label: "Thời gian giao hàng", trigger: "time" },
      { value: "cost", label: "Chi phí vận chuyển", trigger: "cost" },
      { value: "area", label: "Khu vực giao hàng", trigger: "area" },
    ],
  },
  {
    id: "time",
    message:
      "Thời gian giao hàng thường từ 1-3 ngày làm việc tùy vào khu vực của bạn.",
    end: true,
  },
  {
    id: "cost",
    message:
      "Chi phí vận chuyển sẽ được tính dựa trên khoảng cách và trọng lượng của đơn hàng.",
    end: true,
  },
  {
    id: "area",
    message:
      "Chúng tôi giao hàng trên toàn quốc. Vui lòng kiểm tra khu vực giao hàng trên trang web của chúng tôi.",
    end: true,
  },
  {
    id: "promotion",
    message:
      "Bạn muốn biết thông tin về các ưu đãi? Vui lòng chọn loại ưu đãi:",
    trigger: "promotionIssues",
  },
  {
    id: "promotionIssues",
    options: [
      {
        value: "current",
        label: "Ưu đãi hiện tại",
        trigger: "currentPromotions",
      },
      {
        value: "upcoming",
        label: "Ưu đãi sắp tới",
        trigger: "upcomingPromotions",
      },
    ],
  },
  {
    id: "currentPromotions",
    message:
      "Các ưu đãi hiện tại được liệt kê trên trang 'Ưu đãi' của chúng tôi. Vui lòng kiểm tra để biết thêm chi tiết.",
    end: true,
  },
  {
    id: "upcomingPromotions",
    message:
      "Thông tin về các ưu đãi sắp tới sẽ được cập nhật trên trang web của chúng tôi. Vui lòng kiểm tra thường xuyên.",
    end: true,
  },
  {
    id: "feedback",
    message:
      "Chúng tôi rất trân trọng phản hồi của bạn. Vui lòng để lại ý kiến của bạn ở đây:",
    user: true,
    trigger: "feedbackReceived",
  },
  {
    id: "feedbackReceived",
    message:
      "Cảm ơn bạn đã gửi phản hồi. Chúng tôi sẽ xem xét và phản hồi bạn sớm nhất có thể.",
    end: true,
  },
  {
    id: "technical",
    message:
      "Bạn cần hỗ trợ kỹ thuật? Vui lòng cung cấp thêm chi tiết về vấn đề bạn gặp phải.",
    user: true,
    trigger: "technicalSupport",
  },
  {
    id: "technicalSupport",
    message:
      "Chúng tôi sẽ xem xét vấn đề của bạn và liên hệ với bạn để cung cấp hỗ trợ cần thiết.",
    end: true,
  },
  {
    id: "returnPolicy",
    message:
      "Chính sách hoàn trả của chúng tôi cho phép bạn trả lại sản phẩm trong vòng 30 ngày kể từ ngày nhận hàng.",
    end: true,
  },
  {
    id: "vip",
    message:
      "Tài khoản VIP của bạn có nhiều lợi ích, bao gồm ưu đãi đặc biệt và dịch vụ khách hàng ưu tiên.",
    end: true,
  },
  {
    id: "stores",
    message:
      "Thông tin về các cửa hàng của chúng tôi có sẵn trên trang 'Cửa hàng'. Vui lòng kiểm tra để tìm cửa hàng gần bạn nhất.",
    end: true,
  },
];
