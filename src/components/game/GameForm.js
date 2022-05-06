import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

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
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number Of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" className="form-control"
                        // data being received from the back end
                        value={currentGame.gameTypeId}
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
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}

// import React, { useState, useEffect } from "react"
// import { useParams } from "react-router-dom"
// import { useHistory } from 'react-router-dom'
// import { createGame, getGameById, getGameTypes, updateGame } from './GameManager.js'


// export const GameForm = () => {
//     const history = useHistory()
//     const [gameTypes, setGameTypes] = useState([])
//     const {gameId} = useParams()

//     /*
//         Since the input fields are bound to the values of
//         the properties of this state variable, you need to
//         provide some default values.
//     */
//     const editMode = gameId ? true : false

//     const changeGameState = (event) => {
//         // TODO: Complete the onChange function
//         const newGame = Object.assign({}, currentGame)          // Create copy
//         newGame[event.target.name] = event.target.value    // Modify copy
//         setCurrentGame(newGame)  
//     }

//     useEffect(() => {
//         if (editMode) {
//             getGameById(gameId).then((res) => {
//                 res.game_type = res.game_type.id
//                 setCurrentGame(res)
//             })
//         }
//         getGameTypes().then(data => setGameTypes(data))
//         // TODO: Get the game types, then set the state
//     }, [])


//     const [currentGame, setCurrentGame] = useState({
//         skillLevel: 1,
//         numberOfPlayers: 0,
//         title: "",
//         maker: "",
//         gameTypeId: 0
//     })

//     const makeGame = () => {
//         const gameTypeId = parseInt(currentGame.gameTypeId)
//         if (gameTypeId === 0) {
//             window.alert("Please select a category")
//         } else {
//             if (editMode) {
//                 updateGame({
//                     id: currentGame.id,
//                     maker: currentGame.maker,
//                     title: currentGame.title,
//                     number_of_players: parseInt(currentGame.numberOfPlayers),
//                     skill_level: parseInt(currentGame.skillLevel),
//                     game_type: parseInt(gameTypeId)
//                 })
//                 .then(() => history.push('/games'))
//             } else {
//                 createGame({
//                     maker: currentGame.maker,
//                     title: currentGame.title,
//                     number_of_players: parseInt(currentGame.numberOfPlayers),
//                     skill_level: parseInt(currentGame.skillLevel),
//                     game_type: parseInt(gameTypeId)
//                 })
//                 .then(() => history.push('/games'))
//             }
//         }
//     }

//     return (
//         <form className="gameForm">
//             <h2 className="postForm__title">{editMode ? "Update Game" : "Register New Game"}</h2>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="title">Title: </label>
//                     <input type="text" name="title" required autoFocus className="form-control"
//                         value={currentGame.title}
//                         onChange=
//                         // { e => {
//                         //     const copy = {...currentGame}
//                         //     copy.title = e.target.value
//                         //     changeGameState(copy)}
//                         // }
//                     />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="maker">Maker: </label>
//                     <input type="text" name="maker" required autoFocus className="form-control"
//                         value={currentGame.maker}
//                         onChange={changeGameState}
//                     />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="skill_level">SKill Level: </label>
//                     <input type="text" name="skill_level" required autoFocus className="form-control"
//                         // name and value need to match
//                         value={currentGame.skill_level}
//                         onChange={changeGameState}
//                     />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="number_of_players">Number Of Players: </label>
//                     <input type="text" name="number_of_players" required autoFocus className="form-control"
//                         value={currentGame.number_of_players}
//                         onChange={changeGameState}
//                     />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="gameTypeId">Game Type: </label>
//                     <select name="game_type" className="form-control"
//                         // data being received from the back end
//                         value={currentGame.game_type}
//                         onChange={changeGameState}>

//                         <option value="0">Select a Game Type</option>
//                         {
//                             gameTypes.map(gt => (
//                                 <option key={gt.id} value={gt.id}>
//                                     {gt.label}
//                                 </option>
//                             ))
//                         }
//                     </select>
//                 </div>
//             </fieldset>

//             {/* TODO: create the rest of the input fields */}

//             <button type="submit"
//                 onClick={evt => {
//                     evt.preventDefault()
//                     makeGame()
//                 }}
//                 className="btn btn-primary">{editMode ? "Save Updates" : "Create Post"}</button>
//         </form>
//     )
// }