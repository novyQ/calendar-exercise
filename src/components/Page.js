import React, {PureComponent} from 'react';
import Calendar from './Calendar';
import EventDetailOverlay from './EventDetailOverlay';
import {filterEventsByDay, getEventFromEvents} from '../utils';
import DATA_SET from '../utils/data';
import moment from 'moment';
//import moment.js library to handle time

import './Page.css';

const DayNavigator = ({dateDisplay, onPrev, onNext}) => {
    return (
        <nav className="page__nav">
            <button
                className="page__nav-button page__prev-day"
                title="Go to previous day"
                onClick={onPrev}
            />
            <h2 className="page__date">{dateDisplay}</h2>
            <button
                className="page__nav-button page__next-day"
                title="Go to next day"
                onClick={onNext}
            />
        </nav>
    );
};

export default class Page extends PureComponent {
    state = {
        // unfiltered list of events
        events: DATA_SET,

        // The currently selected day represented by numerical timestamp
        day: moment(),

        // The currently selected event in the agenda
        // (mainly to trigger event detail overlay)
        selectedEventId: undefined
    }

    _handleSelectEvent(selectedEventId) {
        this.setState({selectedEventId});
    }

    _handleEventDetailOverlayClose() {
        this.setState({selectedEventId: undefined});
    }

    _handlePrev() {

        const newMoment = moment(this.state.day);
        newMoment.subtract(1, "days");

        this.setState({
            day: newMoment
        });

        // TODO: Update this.state.day to go back 1 day so previous button works
    }

    _handleNext() {

        const newMoment = moment(this.state.day);
        newMoment.add(1, "days");

        this.setState({
            day: newMoment
        });
        // TODO: Update this.state.day to go forward 1 day so next button works
    }

    parseDate(day){

        const now = moment();
        if( now.isSame(day, "day", "month", "year" )){
            return day.format("dddd, MMMM D, YYYY h:mm a zz");
        }
        else{
            return day.format("dddd, MMMM D, YYYY");
        }

    }

    render() {
        let {events, day, selectedEventId} = this.state;
        let filteredEvents = filterEventsByDay(events, day);
        let selectedEvent = getEventFromEvents(events, selectedEventId);
        let eventDetailOverlay;

        if (selectedEvent) {
            eventDetailOverlay = (
                <EventDetailOverlay
                    event={selectedEvent}
                    onClose={this._handleEventDetailOverlayClose.bind(this)}
                />
            );
        }


        return (
            <div className="page" >
                <header className="page__header">
                    <h1 className="page__title">Daily Agenda</h1>
                </header>
                <DayNavigator
                    dateDisplay={this.parseDate(day)}
                    onPrev={this._handlePrev.bind(this)}
                    onNext={this._handleNext.bind(this)}
                />
                <Calendar
                    events={filteredEvents}
                    onSelectEvent={this._handleSelectEvent.bind(this)}
                    timeStamp={this.state.day}/>
                {eventDetailOverlay}
            </div>
        );
    }
}
