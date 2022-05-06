import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { getGameById, getGameTypes, updateGame } from './GameManager.js'


export const UpdateGameDetails = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const {gameId} = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({})

    useEffect(() => {
            getGameById(gameId).then((res) => {
            res.game_type = res.game_type?.id    
                setCurrentGame(res)
            })
        getGameTypes().then(data => setGameTypes(data))
        // TODO: Get the game types, then set the state
    }, [])

    useEffect(() => {
            getGameTypes().then(data => setGameTypes(data))
        // TODO: Get the game types, then set the state
    }, [])

    const changeGameState = (event) => {
            // TODO: Complete the onChange function
        const newGame = Object.assign({}, currentGame)          // Create copy
        newGame[event.target.name] = event.target.value    // Modify copy
        setCurrentGame(newGame)  
    }

    return (
            <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">SKill Level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number Of Players: </label>
                    <input type="text" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="game_type" className="form-control"
                        // data being received from the back end
                        value={currentGame.game_type}
                        onChange={changeGameState}>

                        <option value="0">Select a Game Type</option>
                        {
                                gameTypes.map(gt => (
                                        <option key={gt.id} value={gt.id}>
                                            {gt.label}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </fieldset>
        
                    {/* TODO: create the rest of the input fields */}
        
                    <button type="submit"
                        onClick={evt => {
                                // Prevent form from being submitted
                    evt.preventDefault()
                    // these game properties match the variables in the serializer
                    const game = {
                        id: gameId,
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    updateGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Update Game</button>
        </form>
    )
}