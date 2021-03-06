import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Spinner
} from '@chakra-ui/react'

import Navbar2 from "../Navbarv2";
import ChartJourney1 from '../ChartsJourney/ChartJourney1.js';
import PeopleContainer from '../PeopleList/PeopleContainer.jsx';
import MostInfluent from '../MostInfluent/MostInfluent';
import Comment from '../Comment/Comment';

import { fetchMapById, fetchMapStatistics, fetchProjectById } from "../../services/requestFunctions";
import { ReactComponent as ImageProject } from '../../assets/imgProject.svg'

import printJS from "print-js";
import "./index.scss";
import WindowSize from "./WindowSize";

function Projetos() {

    function printPage() {
        printJS({
            printable: 'printJS-form',
            type: 'html',
            css: ['./index.css' , '../ChartsJourney/ChartJourney1.css', 
            '../ChartsJourney/chartJourneyHorizontal.css', '../PeopleList/PeopleContainer.css'],
            targetStyles: ['*']
            
        })
    };
    
    //State responsavel por mostrar as visualizações do dropdown
    const [project, setProject] = useState({});
    const [projectStatistics, setProjectStatistics] = useState({});
    const [projectUsers, setProjectUsers] = useState({});
    const [lastUpdate, setLastUpdate] = React.useState();
    const [lastActivity, setLastActivity] = React.useState(0);
    

    const newDate = new Date(project.created_at);

    useEffect(() => {
        fetchMapById().then((response) => {
          setProject({...response});
          if (response && projectStatistics !== '') {

            fetchMapStatistics().then((response) => setProjectStatistics({...response}))
            }

        });

        fetchProjectById().then((response) => setProjectUsers({...response}));

    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLastUpdate(localStorage.getItem('lastUpdate'))
        }, 2000);
    }, [])

    useEffect(() => {
        const lastDate = new Date (lastUpdate)
        // console.log(last)
        const today = new Date();

        const diffTime = Math.abs(today - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        setLastActivity(diffDays)
        
    }, [lastUpdate]);

    return (
        
        <div className="desenvolvedores">
        <Navbar2 />
            <div id="printJS-form">
                <div className="mainWrapper">
                    <div className="textTitle">
                        <p>dashboard {'>'} página de projeto</p>
                    </div>
                    <div className="resumoJornada">
                        <ImageProject className="imgProjetcs"/>
                        <div className="infoP">
                            <h1>{project.title}</h1>
                            <p className="titleP">criada em {newDate.toLocaleDateString()}</p>
                            <p className="titleP">última atividade {lastUpdate ? lastActivity : '...'} {lastActivity === 1 ? 'dia' : 'dias'} atrás</p>
                        </div>
                    </div>
                    <div className="introData">
                    {!WindowSize(800) ? 
                    (<Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem>
                            <h3>
                                <AccordionButton>
                                        Participantes
                                    <AccordionIcon />
                                </AccordionButton>
                            </h3>
                            <AccordionPanel pb={4}>
                                <PeopleContainer props={projectUsers}/>
                            </AccordionPanel>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h3>
                                <AccordionButton>
                                Participantes mais influentes
                                    <AccordionIcon />
                                </AccordionButton>
                            </h3>
                            <AccordionPanel pb={4}>
                                <MostInfluent />
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h3>
                                <AccordionButton>
                                Comentário com mais interação
                                    <AccordionIcon />
                                </AccordionButton>
                            </h3>
                            <AccordionPanel pb={4}>
                                <Comment />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>) 
                : ''}
                    </div>
                    <div className="dataWrapper">
                        <div className="data">
                            {ChartJourney1 ? 
                                <ChartJourney1 props={projectStatistics} props2={project}/>
                                
                            : 
                                <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='xl'
                                /> 
                            }
                            {/* <LineChart /> */}
                        </div>
                    </div>
                </div>
                
                {!WindowSize(800) ? '' 
                :
                    (<div className="rightBar">
                        <PeopleContainer props={projectUsers}/>
                        <div className="bestInteractionContainer">
                            <Comment />
                            
                        </div>
                        <button className="btnProj" onClick={printPage}>
                                Baixar relatorio
                        </button>
                    </div>) 
                }
            </div>
            {!WindowSize(800) ? <button className="btnProj" onClick={printPage}>Baixar relatorio</button> : ''} 
            {/* <IndexTable proj={project} projStats={projectStatistics}/> */}
            
        </div>
            
       
    );
}

export default Projetos;