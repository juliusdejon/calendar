import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import styled from 'styled-components'
import "./App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import logo from "./logo.svg";
Calendar.setLocalizer(Calendar.momentLocalizer(moment));

const BigCalendar = withDragAndDrop(Calendar);


const StyledDiv = styled.div` 
  background-color: #ffffff;
  width: 70%;
  height: 100vh;
  padding: 64px 0px 0px 0px;
  display:flex;
  justify-content:center;
  .rbc-calendar {
    height: 100%;
  }

`;


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
    }
  }



  componentDidMount() {
    fetch('https://cors-anywhere.herokuapp.com/http://api.holid.co/v1/ph')
  .then(function(response) {
    return response.json();
  })
  .then((res)=> {
    // eslint-disable-next-line
    const holidaysJSON = res.holidays;
    let holidays = holidaysJSON.map(value => {
      const date = `${value.date} ${ new Date().getFullYear()}`;
      console.log(date);
   });
  console.log(holidays);
  //  this.setState({
  //   events: [... this.state.events,
  //   {
  //     start: parsedDate,
  //     end: parsedDate.add(1).day(),
  //     title: value.name
  //   }],
  // });
  });


  
  }
  onSelectSlot = ({start, end}) => {
    const season = window.prompt('Create a Special Season')
    if (season) {
    const yes = window.prompt('Apply this every year?')
      if(yes === 'yes') {
        alert('This will be applied every year')
        this.setState({
          events: [
            ...this.state.events,
            {
              start,
              end,
              title:season,
            },
          ],
      })
      } else {
        alert('Setted for this year only ');
        this.setState({
          events: [
            ...this.state.events,
            {
              start,
              end,
              title:season,
            },
          ],
      })
      }
    }
  
  }

  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }

  resizeEvent = (e) => {
    console.log(e)

  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <StyledDiv>
        <BigCalendar
            selectable
            localizer={this.props.localizer}
            events={this.state.events}
            onEventDrop={this.moveEvent}
            resizable
            onEventResize={this.resizeEvent}
            onSelectSlot={this.onSelectSlot}
            defaultDate={new Date(2015, 3, 12)}
          />
        </StyledDiv>
      </div>
    );
  }
}

export default App;
