import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const WSContext = React.createContext({
    isConnected: false,
    handleWS: (ip: string, port: string) => { },
    ws: new WebSocket(`ws://localhost:9999`),
    handleWSClose: () => {}
});

const WSContextProvider: React.FC = (props) => {
    
    const [isConnected, setIsConnected] = useState(false)
    const [ws, setWebSocket] = useState<WebSocket>(new WebSocket(`ws://localhost:9999`))

    const handleWS = (ip: string, port: string) => {
        setWebSocket(new WebSocket(`ws://${ip}:${port}`))
    }

    const handleWSClose = () => {
        setIsConnected(false)
        ws.close()
    }

    useEffect(() => {

        ws.onclose = () => {
            console.log("ws closed");
        }

        ws.onerror = (err) => {
            setIsConnected(false)
            console.log(err)
        }

        ws.onopen = () => {
            setIsConnected(true)
            console.log("ws opened")
        }

        return () => {
            setIsConnected(false)
            ws.close()
        }
    }, [ws])

    return (
        <WSContext.Provider
            value={{
                isConnected,
                handleWS,
                ws,
                handleWSClose
            }}
        >
            {props.children}
        </WSContext.Provider>
    )

}

const WSContextConsumer = WSContext.Consumer;

export { WSContext, WSContextProvider, WSContextConsumer }