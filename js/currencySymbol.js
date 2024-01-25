function getCurrencySymbol(country) {
  // 기본값으로 빈 문자열 설정
  var currencySymbol = "";

  // 나라에 따라 화폐 기호 설정
  switch (country) {
    case "일본":
      currencySymbol = " ¥";
      break;
    case "미국":
      currencySymbol = " $";
      break;
    case "베트남":
      currencySymbol = " ₫";
      break;
    case "태국":
      currencySymbol = " ฿";
      break;
    default:
      // 기본값 유지
      break;
  }

  return currencySymbol;
}
