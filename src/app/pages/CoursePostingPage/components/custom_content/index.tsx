import React from 'react';
import { Button, message } from 'antd';
import { useHistory } from 'react-router-dom';

import { STEP_ITEMS } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { COURSE_POSTING_PAGE_PATH } from '../../../../../constants/routes';
import {
  coursePostingNextStep,
  setCoursePostingStep,
  selectCoursePostingStep,
} from '../../../../../features/teacher/teacherSlice';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';

export default function CustomContent(props: {
  step: number;
  component: JSX.Element;
  shouldShowNextButton: boolean;
}) {
  const { step, component, shouldShowNextButton } = props;

  const coursePostingStep = useAppSelector(selectCoursePostingStep);

  const dispatch = useAppDispatch();

  const history = useHistory();

  React.useEffect(() => {
    // console.log(coursePostingStep);
    // console.log(step);
    coursePostingStep !== step && dispatch(setCoursePostingStep(step));
  }, [coursePostingStep, dispatch, step]);

  const next = () => {
    if (coursePostingStep === STEP_ITEMS.length - 1) {
      dispatch(setCoursePostingStep(0));
      // Done
      message.success('Processing complete!');
    } else {
      // Next step
      dispatch(coursePostingNextStep());
      // Navigation
      history.push(`${COURSE_POSTING_PAGE_PATH}/${STEP_ITEMS[step + 1].path}`);
    }
  };

  return (
    <>
      <HeaderSiderContentLayout
        components={[
          {
            title: `Step ${step + 1}`,
            contentComponent: (
              <>
                {shouldShowNextButton ? (
                  <Button type="primary" onClick={() => next()}>
                    {step !== STEP_ITEMS.length - 1 ? 'Next step' : 'Done'}
                  </Button>
                ) : (
                  component
                )}
              </>
            ),
          },
        ]}
      />
    </>
  );
}
