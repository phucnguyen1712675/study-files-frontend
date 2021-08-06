export const checkIfCourseHasPromotion = (
  promotionStart: Date,
  promotionEnd: Date,
  originalFee: number,
  fee: number,
) => {
  return (
    // start < now < end
    ((new Date(promotionStart) < new Date() &&
      new Date(promotionEnd) > new Date()) ||
      // or now > start
      new Date(promotionStart) > new Date()) &&
    // and originalFee !== fee
    originalFee !== fee
  );
};
