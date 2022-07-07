import React from 'react';
import SentimentVeryDissatisfied from "@material-ui/icons/SentimentVeryDissatisfied";
import {SentimentDissatisfied} from "@material-ui/icons";

const grades=['bad','not bad','good','very good','excellent']
export const Grades = () => {
    return (
        <div>
            {grades.map((g, i) => (
                <div>
                    <SentimentVeryDissatisfied key={'bad' + i} onClick={() => {
                    }}/>
                    <SentimentDissatisfied key={'not bad' + i} onClick={() => {
                    }}/>
                    {g}</div>
            ))}

        </div>
    );
};

