import React from "react"
import { Route } from "react-router-dom"
import { EventForm } from "./event/EventForm.js"
import { EventList } from "./event/EventList.js"
import { UpdateEventDetails } from "./event/UpdateEvent.js"
import { GameForm } from "./game/GameForm.js"
import { GameList } from "./game/GameList.js"
import { UpdateGameDetails } from "./game/UpdateGame.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path="/games/edit/:gameId(\d+)">
                <UpdateGameDetails />
            </Route>
            <Route exact path="/events/edit/:eventId(\d+)">
                <UpdateEventDetails />
            </Route>
        </main>
    </>
}