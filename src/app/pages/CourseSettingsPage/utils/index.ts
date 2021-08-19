import { Section } from '../../../../types';

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

export const checkIfEveryLectureHasVideo = (sections: Section[]) => {
  if (sections.length === 0) {
    return false;
  }

  return sections
    .filter(section => section.lectures.length > 0)
    .every(section => {
      const isAllLectureHasVideo = section.lectures.every(
        lecture => lecture.videoUrl,
      );

      return isAllLectureHasVideo;
    });
};
