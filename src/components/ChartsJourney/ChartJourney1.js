import React from 'react';
import "./chartJourneyHorizontal.css";
import Legend from './legendJourney.js';

import "./ChartJourney1.css";
import LineChart from "../Projetos/LineChart";
import {
    Box,
    Spinner
} from '@chakra-ui/react'


const Progress = ({ done, classN }) => (

    <div className='progress'>
        <div className="progress-bar">
            <div className={classN} style={{
                opacity:1,
                width: `${done}%`
            }}>
            </div>
        </div> 
        <p className="progressTxt">{done}%</p>
    </div>
);

const ProgressH = ({ done, classN }) => (
    <div className='progress'>
        <div className="progressH">
            <div className={classN} style={{
                opacity:1,
                width: `${done}%`
            }}>
            </div>
        <p className="progressTxtH">{done}%</p>
        </div> 
    </div>
);

export const activeParticipants = (activePeople, usersLength) => Math.round((activePeople / usersLength) * 100);
export const questionsEngagements = (parentsComments, questionCount, activePeople) => parseFloat(Math.round(parentsComments / (questionCount * activePeople) * 100));
export const debatesEngagements = (agreementsComments, replyComments, parentsComments, activePeople) => {
    return parseFloat(Math.round
        ((agreementsComments + replyComments) 
        / 
        ((parentsComments * activePeople) / 2) * 100))
};
export const divergencesEngagements = (parentsComments, questionCount, activePeople, agreementsComments, replyComments) => {
    return parseFloat(Math.round
        ((parentsComments / (questionCount * activePeople))
        +
        (((agreementsComments + replyComments)
        /
        ((parentsComments * activePeople) / 2)) / 2) * 100))
};

const ChartJourney1 = ({props , props2}) => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
       if(Object.entries(props).length > 0) setLoading(false);
    }, [props])
   
    return (
        <>
        {loading ? 
        <Box display='flex' h='200px' justifyContent='center' alignItems='center'>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            /> 
        </Box>
        : ''}
        {props2.users && props.people_active_count && (
        <div className="chartJWrapper">
            <div className="leftData"> 
               <h2>??ndices</h2>  
               <div>

                   <h3 className="chartJourneyTitle1">Pessoas ativas na jornada </h3>
                   <Progress classN='progress-done' done={activeParticipants(props.people_active_count, props2?.users.length)}/>
                   <p className="chartJourneyP1">Total de participantes: {props2?.users.length}</p>
                   <p className="chartJourneyP3">Pessoas inativas: {props2?.users.length - props.people_active_count}</p>
               </div>
               <div>
                   <h3 className="chartJourneyTitle1">Engajamento nas quest??es</h3>
                   <Progress classN='progress-done2' done={questionsEngagements(props.parent_comments_count, props.question_count, props.people_active_count)}/>
                   <p className="chartJourneyP1">N?? de quest??es: {props.question_count}</p>
                   <p className="chartJourneyP3">N?? de respostas: {props.parent_comments_count} de {props.parent_comments_count * props.people_active_count} esperadas</p>
               </div>
               <div>
                   <h3 className="chartJourneyTitle1">Engajamento nos debates</h3>
                   <Progress classN='progress-done3' done={ debatesEngagements(props.agreements_comments_count, props.reply_comments_count, props.parent_comments_count, props.people_active_count)}/>
                   <p className="chartJourneyP1">N?? de coment??rios: {props.total_comments_count}</p>
                   <p className="chartJourneyP2">N?? de concordos: {props.agreements_comments_count}</p>
                   <p className="chartJourneyP3">N?? de intera????es: {(props.agreements_comments_count + props.replied_parent_comments_count) + ' '}
                    de {(props.people_active_count * props.replied_parent_comments_count)/2} esperadas</p>
               </div>
               <div>
                   <h3 className="chartJourneyTitle1">Engajamento nas diverg??ncias</h3>
                   <Progress classN='progress-done4' done={ divergencesEngagements(props.parent_comments_count, props.question_count, props.people_active_count, props.agreements_comments_count ,props.reply_comments_count)}/>
               </div>
            </div>
            <div className="rightData">
                <h3 className="chartJourneyTitle1">Balan??o ??ndices</h3>
                <div className="chartJourHoriWrapper">
                    <ProgressH done={activeParticipants(props.people_active_count, props2?.users.length)} classN='progress-doneH'/>
                    <ProgressH classN='progress-doneH2' done={questionsEngagements(props.parent_comments_count, props.question_count, props.people_active_count)}/>
                    <ProgressH classN='progress-doneH3' done={debatesEngagements(props.agreements_comments_count, props.reply_comments_count, props.parent_comments_count, props.people_active_count)}/>
                    <ProgressH classN='progress-doneH4' done={divergencesEngagements(props.parent_comments_count, props.question_count, props.people_active_count, props.agreements_comments_count ,props.reply_comments_count)}/>
                </div>
                <Legend />
                <LineChart/>
            </div>
        </div>  
        )} </>    
    )
};

export default ChartJourney1;