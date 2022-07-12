import React, {ChangeEvent, useState} from 'react';
import SentimentVeryDissatisfied from "@material-ui/icons/SentimentVeryDissatisfied";
import {SentimentDissatisfied, SentimentSatisfiedAlt, SentimentVerySatisfied} from "@material-ui/icons";
import style from "./Grades.module.scss"
import {AppStateType, useAppDispatch} from "../reducers/store";
import {CardType, GradeCardsTC} from "../reducers/packCards-reducer";
import {FormControl, IconContainerProps, Rating} from "@mui/material";
import {styled} from "@mui/material/styles"
import {useSelector} from "react-redux";


export const Grades = () => {
    const idCard = useSelector<AppStateType,string>(state => state.cards.randomCardId)

    // const [value, setValue] = useState<number>(1)
    const dispatch = useAppDispatch()
    // const gradeHandler = (grade: number, card_id: string) => {
    //     dispatch(GradeCardsTC(grade, card_id))
    // }
    const StyledRating = styled(Rating)(({theme}) => ({
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
            icon: <SentimentVeryDissatisfied className={style.one} fontSize="large"/>,
            label: 'bad',
        },
        2: {
            icon: <SentimentDissatisfied className={style.two} fontSize="large"/>,
            label: 'not bad',
        },
        3: {
            icon: <SentimentDissatisfied className={style.three} fontSize="large"/>,
            label: 'good',
        },
        4: {
            icon: < SentimentSatisfiedAlt className={style.four} fontSize="large"/>,
            label: 'very good',
        },
        5: {
            icon: < SentimentVerySatisfied className={style.five} fontSize="large"/>,
            label: 'excellent',
        },
    };

    function IconContainer(props: IconContainerProps) {
        const {value, ...other} = props;
        return <span {...other}>{iconsToGrade[value].icon}</span>;
    }

    const onChangeHandler = (e: React.SyntheticEvent, value: number | null) => {//fix
        if (value !== null) {
            dispatch(GradeCardsTC(value, idCard))


        }
    }

    return (
        <div>
            <h4>Rate your answer</h4>

            <FormControl className={style.grade}>
                <StyledRating
                    name='highlight-selected-only'
                    defaultValue={1}
                    onChange={onChangeHandler}
                    IconContainerComponent={IconContainer}
                    getLabelText={(value: number) => iconsToGrade[value].label}
                    highlightSelectedOnly
                />
            </FormControl>
            {/*{grades.map((g, i) => (*/}
            {/*    <div>*/}
            {/*        /!*<SentimentVeryDissatisfied key={'bad' + i} onClick={() => {*!/*/}
            {/*        /!*}}/>*!/*/}
            {/*        /!*<SentimentDissatisfied key={'not bad' + i} onClick={() => {*!/*/}
            {/*        /!*}}/>*!/*/}
            {/*        {g}</div>*/}
            {/*))}*/}

        </div>
    );
};

