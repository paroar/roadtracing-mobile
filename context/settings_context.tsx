import React from 'react';
import { useState } from 'react';

const SettingsContext = React.createContext({
    interval: 1000,
    handleInterval: (f: number) => { },
    deviceID: "",
    handleDeviceID: (id: string) => { },
    groupID: "",
    handleGroupID: (id: string) => { },
});

const SettingsContextProvider: React.FC = (props) => {
    const [interval, setInterval] = useState(1000)
    const [deviceID, setDeviceID] = useState("")
    const [groupID, setGroupID] = useState("")

    const handleInterval = (f: number) => {
        setInterval(f)
    }

    const handleDeviceID = (id: string) => {
        setDeviceID(id)
    }

    const handleGroupID = (id: string) => {
        setGroupID(id)
    }

    return (
        <SettingsContext.Provider
            value={{
                interval: interval,
                handleInterval,
                deviceID,
                handleDeviceID,
                groupID,
                handleGroupID,
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    )

}

const SettingsContextConsumer = SettingsContext.Consumer;

export { SettingsContext, SettingsContextProvider, SettingsContextConsumer }