import React from 'react'
import {Switch,Redirect,Route}from 'react-router-dom'

const MapRoute=({route})=>(
    <Switch>   
        {
            route.map((Item)=>(
                Item.path?(
                    Item.children?(
                        <Route
                            key={Item.path}
                            route={Item.path}
                            component={
                                props=> <Item.component {...props} route={Item.children}>
                                    <MapRoute {...props} route={Item.children}></MapRoute>
                                </Item.component>
                            }
                        ></Route>
                    ):(
                        <Route
                            key={Item.path}
                            path={Item.path}
                            component={
                                props=> <Item.component
                                    {...props}
                                ></Item.component>
                            }
                        ></Route>
                    )
                ):(
                        <Redirect {...Item} key={Item.from}></Redirect>
                    )
            ))
        }
    </Switch>
)
export default MapRoute