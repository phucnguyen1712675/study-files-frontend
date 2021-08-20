import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

import { STEP_ITEMS } from '../../constants';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  COURSE_POSTING_PAGE_PATH,
  TEACHER_COURSES_PAGE_PATH,
} from '../../../../../constants/routes';
import {
  coursePostingNextStep,
  setCoursePostingStep,
  selectCoursePostingStep,
} from '../../../../../features/teacher/teacherSlice';

type Props = {
  step: number;
  children: React.ReactNode;
  shouldShowNextButton: boolean;
};

export default function CustomContent({
  step,
  children,
  shouldShowNextButton,
}: Props) {
  const coursePostingStep = useAppSelector(selectCoursePostingStep);

  const dispatch = useAppDispatch();

  const history = useHistory();

  React.useEffect(() => {
    coursePostingStep !== step && dispatch(setCoursePostingStep(step));
  }, [coursePostingStep, dispatch, step]);

  const next = () => {
    if (coursePostingStep === STEP_ITEMS.length - 1) {
      dispatch(setCoursePostingStep(0));

      history.push(TEACHER_COURSES_PAGE_PATH);
    } else {
      // Next step
      dispatch(coursePostingNextStep());
      // Navigation
      history.push(`${COURSE_POSTING_PAGE_PATH}/${STEP_ITEMS[step + 1].path}`);
    }
  };

  const components = [
    {
      id: '1',
      title: `Step ${step + 1}`,
      children: (
        <>
          {shouldShowNextButton ? (
            <Button type="primary" onClick={() => next()}>
              {step !== STEP_ITEMS.length - 1 ? 'Next step' : 'Done'}
            </Button>
          ) : (
            children
          )}
        </>
      ),
    },
  ];

  return <HeaderSiderContentLayout components={components} />;
}
