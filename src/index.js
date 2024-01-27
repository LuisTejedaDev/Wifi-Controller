import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {FailedNetwork} from "./Components"
import { useState } from "react";

export default () => {
    const [online, setOnline] = useState(true);

    return(
        <>
            <SafeAreaView style={{flex: 0, backgroundColor: '#2471D9'}}/>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => setOnline(!online)}
                    style={{width: 100, height: 50, backgroundColor: '#2471D9', justifyContent: 'center', alignItems: 'center'}}
                >
                    <Text style={{fontWeight: 'bold', color: '#fff'}}>Cambiar</Text>
                </TouchableOpacity>
                <FailedNetwork online={online}/>
            </View>
            <SafeAreaView style={{flex: 0, backgroundColor: '#2471D9'}}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    }
})