import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getGames } from "../game/GameManager"
import { createEvent } from "./EventManager"

export const EventForm = () => {
    
    const history = useHistory()
    
    const [games, setGames] = useState([])
    
    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        gameId: 0
    })

    useEffect(() => {
        getGames().then(data => setGames(data))
        // TODO: Get the game types, then set the state
    }, [])

    const changeEventState = (event) => {
        // TODO: Complete the onChange function
        const newEvent = Object.assign({}, currentEvent)          // Create copy
        newEvent[event.target.name] = event.target.value    // Modify copy
        setCurrentEvent(newEvent)  
    }

    return(
        <form>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        // data being received from the back end
                        value={currentEvent.gameId}
                        onChange={changeEventState}>

                        <option value="0">Select a Game</option>
                        {
                            games.map(g => (
                                <option key={g.id} value={g.id}>
                                    {g.title}
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
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    // these game properties match the variables in the serializer
                    const event = {
                        game: parseInt(currentEvent.gameId),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
        
    )
}