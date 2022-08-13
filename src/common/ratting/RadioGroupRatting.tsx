import React from 'react';
import { useSelector } from 'react-redux';
import { AppStateType, useAppDispatch } from 'reducers/store';
import { styled } from '@mui/material/styles';
import { FormControl, IconContainerProps, Rating } from '@mui/material';
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied';
import style from 'components/Grades.module.scss';
import {
  SentimentDissatisfied,
  SentimentSatisfiedAlt,
  SentimentVerySatisfied,
} from '@material-ui/icons';
import { GradeCardsTC } from 'reducers/packCards-reducer';

export const RadioGroupRatting = () => {
  const idCard = useSelector<AppStateType, string>((state) => state.cards.randomCardId);

  const dispatch = useAppDispatch();

  const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
    },
  }));
  const iconsToGrade: {
    [index: string]: {
      icon: React.ReactElement;
      label: string;
    };
  } = {
    1: {
      icon: <SentimentVeryDissatisfied className={style.one} fontSize="large" />,
      label: 'bad',
    },
    2: {
      icon: <SentimentDissatisfied className={style.two} fontSize="large" />,
      label: 'not bad',
    },
    3: {
      icon: <SentimentDissatisfied className={style.three} fontSize="large" />,
      label: 'good',
    },
    4: {
      icon: <SentimentSatisfiedAlt className={style.four} fontSize="large" />,
      label: 'very good',
    },
    5: {
      icon: <SentimentVerySatisfied className={style.five} fontSize="large" />,
      label: 'excellent',
    },
  };

  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{iconsToGrade[value].icon}</span>;
  }

  const onChangeHandler = (e: React.SyntheticEvent, value: number | null):void => { // fix
    if (value !== null) {
      dispatch(GradeCardsTC(value, idCard));
    }
  };
  return (
    <div>
      <FormControl className={style.grade}>
        <StyledRating
          name="highlight-selected-only"
          defaultValue={1}
          onChange={onChangeHandler}
          IconContainerComponent={IconContainer}
          getLabelText={(value: number) => iconsToGrade[value].label}
          highlightSelectedOnly
        />
      </FormControl>
    </div>
  );
};
