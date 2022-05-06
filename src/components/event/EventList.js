import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "./EventManager.js"

export const EventList = (props) => {
    const [events, setEvents] = useState([])

    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const eventListRefresh = () => {
        getEvents().then(data => setEvents(data))
    }

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Game</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">What: {event.organizer.user.username} presents {event.description}</div><br></br>
                        <div className="event__game"> How: For players of {event.game.title}</div><br></br>
                        <div className="event__date">When: {event.date} {event.time}</div><br></br>
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                history.push({ pathname: `/events/edit/${event.id}` })
                            }}
                        >Edit Event</button>
                        <button className="btn btn-2 btn-sep icon-delete"
                            onClick={() => {
                                deleteEvent(event.id)
                                eventListRefresh()
                            }}>
                            Delete Event
                        </button>
                        {
                            // TODO: create the Leave button
                            event.joined ?
                                <button type="submit"
                                    onClick={evt => {
                                        leaveEvent(event.id)
                                        eventListRefresh()
                                    }}
                                    className="btn btn-primary">Leave Event</button>
                                : <button type="submit"
                                    onClick={evt => {
                                    
                                        joinEvent(event.id)
                                        eventListRefresh()
                                    }}
                                    className="btn btn-primary">Join Event</button>
                            // TODO: create the Join button
                        }
                    </section>
                })
            }
        </article>
    )
}