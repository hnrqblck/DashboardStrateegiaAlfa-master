import React from 'react';
import Item from './Item';
import Carousel, { consts } from 'react-elastic-carousel';
import ChartPAtivas from "../Charts/ChartPAtivas";
import ChartEQuestoes from "../Charts/ChartEQuestoes";
import ChartEDebates from "../Charts/ChartEDebates";
import ChartEDiver from "../Charts/ChartEDiver";
import './carousel.scss';


const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

const CarouselItem = ({journeyArr}) => {
  return (
    <div className="charts">
      <Carousel breakPoints={breakPoints}>
          <Item className="chartsContent">
              <ChartPAtivas props={journeyArr.map(journey => journey.people_active_count)}/>
            <div className="iconAndText">
              <img src="group.svg" className="iconComp"/>
              <p>Pessoas ativas na jornada</p>
            </div>
        </Item>
          <Item className="chartsContent">
            <ChartEDebates props={journeyArr.map(journey => parseFloat(
                (journey.agreements_comments_count+journey.reply_comments_count)
                /
                ((journey.parent_comments_count*journey.people_active_count)/2)*100).toFixed(2)
            )} />
            <div className="iconAndText">
                <img src="squareChat.svg" className="iconComp"/>
                <p>Engajamento nos debates</p>
            </div>
          </Item>
        <Item className="chartsContent">
            <ChartEQuestoes props={journeyArr.map(journey => parseFloat(
                journey.parent_comments_count
                /
                (journey.question_count*journey.people_active_count)*100)
                .toFixed(2)
                )}/>
            <div className="iconAndText">
                <img src="circledQuestion.svg" className="iconComp"/>
                <p>Engajamento nas questões</p>
            </div>
        </Item>
        <Item className="chartsContent">
            <ChartEDiver props={journeyArr.map(journey => parseFloat( 
                (journey.parent_comments_count
                /
                (journey.question_count*journey.people_active_count))
                +
                (((journey.agreements_comments_count+journey.reply_comments_count)
                /
                ((journey.parent_comments_count*journey.people_active_count)/2))/2)*100).toFixed(2))
            }/>
            <div className="iconAndText">
                <img src="chatBubbles.svg" className="iconComp"/>
                <p>Engajamento nas divergências</p>
            </div>
        </Item>
      </Carousel>
    </div>
  )
};

export default CarouselItem;