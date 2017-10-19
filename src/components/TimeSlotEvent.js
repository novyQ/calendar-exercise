import React, {PureComponent, PropTypes} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import moment from 'moment';
import './TimeSlotEvent.css';

export default class TimeSlotEvent extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onSelect: PropTypes.func.isRequired
    }

    render() {
        let {
            event: {title, color, start},
            onSelect,
        } = this.props;

        function addFadeClass(){
            var eventTime = moment(start);
            var now = moment();
            if (now > eventTime) {
                return "time-slot-event-fade";
            } else {
                return "";
            }
        }

        // TODO: Need a way to determine that the event is in the past so that it
        // can be displayed faded-out

        return (
            <button className={`time-slot-event time-slot-event--${color} ${addFadeClass()}`} onClick={onSelect}>
                {title}
            </button>
        );
    }
}
