import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { getGames } from "../game/GameManager.js"
import { getEventById, getEventTypes, updateEvent } from './EventManager.js'


export const UpdateEventDetails = () => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const { eventId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({})

    useEffect(() => {
        getEventById(eventId).then((res) => {
            setCurrentEvent(res)
            res.game = res.game?.id
        })
        getGames().then(data => setGames(data))
        // TODO: Get the event types, then set the state
    }, [])


    const changeEventState = (event) => {
        // TODO: Complete the onChange function
        const newEvent = Object.assign({}, currentEvent)          // Create copy
        newEvent[event.target.name] = event.target.value    // Modify copy
        setCurrentEvent(newEvent)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Update Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventTypeId">Event Game: </label>
                    <select name="game" className="form-control"
                        // data being received from the back end
                        game = {currentEvent.game}
                        value={currentEvent.game}
                        onChange={changeEventState}>

                        <option value="0">Select a Game</option>
                        {
                            games.map(gt => (
                                <option key={gt.id} value={gt.id}>
                                    {gt.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Event description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    // these event properties match the variables in the serializer
                    const event = {
                        id: currentEvent.id,
                        game: parseInt(currentEvent.game),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    updateEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Update event</button>
        </form>
    )
}