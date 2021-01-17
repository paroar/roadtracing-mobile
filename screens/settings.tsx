import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { pallete } from "../assets/pallete";
import { WSContext } from "../context/websocket_context";
import { Feather } from '@expo/vector-icons';
import { SettingsContext } from "../context/settings_context";

const SettingsScreen: React.FC = () => {
    const [ip, setIP] = useState("")
    const [port, setPort] = useState("")

    const {
        isConnected,
        handleWS,
        handleWSClose,
    } = useContext(WSContext)

    const {
        handleInterval,
        handleDeviceID,
        handleGroupID,
    } = useContext(SettingsContext)

    const handleIntervalSetting = (f: string) => {
        if(parseInt(f) && parseInt(f) >= 500){
            handleWSClose()
            handleInterval(parseInt(f))
        }
    }

    const handleConnection = (ip: string, port: string) => {
        if (ip.length > 0 && parseInt(port) && port.length > 0 && port.length < 5) {
            handleWS(ip, port)
        } else {
            alert("Incorrect connection params")
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.group}>
                <Text>Interval in ms (optional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Interval"}
                    keyboardType={"number-pad"}
                    onChangeText={(e) => handleIntervalSetting(e)}
                />
            </View>

            <View style={styles.group}>
                <Text>Identifiers (optional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Device"}
                    onChangeText={(e) => handleDeviceID(e)}
                />
                <TextInput
                    style={styles.input}
                    placeholder={"Group"}
                    onChangeText={(e) => handleGroupID(e)}
                />
            </View>

            <View style={styles.group}>
                <Text>Connection (required)</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"IP address"}
                    keyboardType={"number-pad"}
                    onChangeText={(e) => setIP(e)}
                />

                <TextInput
                    style={styles.input}
                    placeholder={"Port"}
                    keyboardType={"number-pad"}
                    onChangeText={(e) => setPort(e)}
                />
            </View>

            <View>
                <TouchableOpacity
                    onPress={() => handleConnection(ip, port)}
                >

                    <View style={styles.connectBtn}>
                        <Text style={styles.textBtn}>Connect</Text>
                        {isConnected ?
                            <Feather
                                name="zap"
                                size={18}
                                color={pallete.white}
                            />
                            :
                            <Feather
                                name="zap-off"
                                size={18}
                                color={pallete.white}
                            />
                        }
                    </View>


                </TouchableOpacity>
            </View>

        </View>
    );
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    group: {
        width: "90%",
    },
    slider: {
        height: 40
    },
    input: {
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "grey",
        borderRadius: 3,
        margin: 10
    },
    connectBtn: {
        borderRadius: 50,
        backgroundColor: pallete.main,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 40,
    },
    textBtn: {
        color: "white",
        paddingVertical: 10,
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 16,
        marginEnd: 10,
    },
})