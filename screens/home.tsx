import React from "react";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { pallete } from "../assets/pallete";
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRef } from "react";
import { Accelerometer, ThreeAxisMeasurement } from 'expo-sensors';
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { WSContext } from "../context/websocket_context";
import { SettingsContext } from "../context/settings_context";

const HomeScreen: React.FC = () => {
    const [hasPermissions, setHasPermissions] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const location = useRef<Location.LocationObject>()
    const acceleration = useRef<ThreeAxisMeasurement>()

    const { ws, isConnected } = useContext(WSContext)
    const { interval, deviceID, groupID } = useContext(SettingsContext)


    useLayoutEffect(() => {
        handlePermission();
    }, [])

    useLayoutEffect(() => {
        if (!isConnected) {
            setIsSending(false)
        }
    }, [isConnected])

    useLayoutEffect(() => {
        if (isSending) {
            const timeInterval = setInterval(() => {
                (async () => {
                    let loc = await Location.getCurrentPositionAsync({ accuracy: Location.LocationAccuracy.High });
                    location.current = loc;
                })();
            }, interval)
            return () => clearInterval(timeInterval)
        }
    }, [isSending])

    useLayoutEffect(() => {
        if (isConnected && isSending) {
            Accelerometer.setUpdateInterval(interval)
            Accelerometer.addListener(accelerometerData => {
                acceleration.current = accelerometerData;
            })
            return () => {
                Accelerometer.removeAllListeners()
            }
        }
    }, [isSending])

    useEffect(() => {
        if (isSending) {
            const timeInterval = setInterval(() => {
                if (location.current) {
                    const positionInfo = {
                        timestamp: location.current!.timestamp,
                        ...location.current!.coords,
                        ...acceleration.current,
                        deviceID: deviceID,
                        groupID: groupID
                    }
                    ws!.send(JSON.stringify(positionInfo))
                }
            }, interval)

            return () => clearInterval(timeInterval)
        }
    }, [isSending])

    const handlePermission = () => {
        (async () => {
            let { granted, canAskAgain } = await Location.getPermissionsAsync();
            if (granted) {
                setHasPermissions(true)
            } else if (!canAskAgain) {
                alert("Enable the access location on phone settings")
            } else {
                (async () => {
                    let per = await Location.requestPermissionsAsync();
                    if (per.granted) {
                        setHasPermissions(true)
                    } else {
                        setHasPermissions(false)
                    }
                })();
            }
        })();
    }

    const handlePress = () => {
        if (hasPermissions && isSending) {
            setIsSending(false)
        } else if (hasPermissions && !isSending) {
            setIsSending(true)
        } else {
            handlePermission()
        }
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.button}
                disabled={!isConnected}
            >
                {
                    isConnected ?
                        <Feather
                            name="wifi"
                            size={150}
                            color={pallete.white}
                            style={
                                isSending ?
                                    { ...styles.active, ...styles.buttonIcon, ...styles.sending }
                                    :
                                    { ...styles.active, ...styles.buttonIcon }
                            }
                            onPress={handlePress}
                        />
                        :
                        <Feather
                            name="wifi-off"
                            size={150}
                            color={pallete.white}
                            style={{ ...styles.inactive, ...styles.buttonIcon }}
                        />
                }

            </TouchableOpacity>
        </View>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonIcon: {
        borderRadius: 200 / 2,
        padding: 20,
    },
    active: {
        backgroundColor: pallete.main,
    },
    inactive: {
        backgroundColor: pallete.darkMain,
    },
    sending: {
        backgroundColor: pallete.green,
    }
})