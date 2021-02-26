import React, {useEffect, useState} from 'react';

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

const DriversAndClassesDragAndDrop = ({drivers, setDrivers, classrooms, setClassrooms}) => {
  const [classroomsWithNoDriver, setClassroomWithNoDriver] = useState([]);

  useEffect(() => {
    setClassroomWithNoDriver(getClassesWithNoDriver());
  }, []);

  const handleOnDragEnd = () => {
    console.log("[handleOnDragEnd]");

  }

  const getClassesWithNoDriver = () => {
    return classrooms.map((classroom, index) => {
      if (classroom.hasDriver) {
        return classroom;
      }
    });
  }

  return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Grid container spacing={10} style={{height: '100%', width: '100%', direction: 'rtl'}}>
            {/*<Droppable droppableId="nodrivers">*/}
            {/*  here*/}
            {/*  {*/}
            {/*    (provided) =>*/}
            {/*        <ul className={"no-driver"} {...provided.droppableProps} ref={provided.innerRef}>*/}
            {/*          {*/}
            {/*            (classroomsWithNoDriver.map((classroom, index) => {*/}
            {/*              return <Draggable key={'1'} draggableId={'12'} index={1}>*/}
            {/*                {*/}
            {/*                  (provided) => (*/}
            {/*                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>*/}
            {/*                        <div> {classroom && classroom._id} {' '} {classroom && classroom.classroom.hebName} </div>*/}
            {/*                      </li>*/}
            {/*                  )*/}
            {/*                }*/}
            {/*              </Draggable>*/}
            {/*            }))*/}
            {/*          }*/}
            {/*          {provided.placeholder}*/}
            {/*        </ul>*/}
            {/*  }*/}
            {/*  </Droppable>*/}
          <Droppable droppableId="drivers">
          {
            (provided) => (drivers.map((driver, index) => {
              return (
                  <Grid item xl={4} lg={4} md={3} xs={3} sm={3} style={{border: '1px solid #ccc'}}>
                    <Card>
                      <Grid style={{backgroundColor: '#012345', color: 'white', fontSize: '18'}}>
                        <center> <b> {driver.name} </b> </center>
                      </Grid>

                    </Card>

                    <ul className={driver.name} {...provided.droppableProps} ref={provided.innerRef}>
                      {
                        (driver.classrooms.map((classroom, index) => {
                          return <Draggable key={'1'} draggableId={'12'} index={1}>
                              {
                                (provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                      <div> {classroom._id} {' '} {classroom.classroom.hebName} </div>
                                    </li>
                                )
                              }
                            </Draggable>
                      }))
                      }
                      {provided.placeholder}
                    </ul>
                  </Grid>
              )
            }))
          }
        </Droppable>
        </Grid>
      </DragDropContext>
  );
};

export default DriversAndClassesDragAndDrop;