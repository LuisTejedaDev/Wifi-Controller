import {useEffect, useRef} from "react"
import {Animated, Image, StyleSheet, Text, View} from "react-native"
import {error, ok} from "../colors"
import {useDispatch, useSelector} from "react-redux"
import {selectCuenta, setCuenta} from "../slices/appSlice"

export default ({online}) => {
    const dispatch = useDispatch()
    const cuenta = useSelector(selectCuenta)
    
    const scale = useRef(new Animated.Value(0)).current
    const width = useRef(new Animated.Value(0)).current

    const startAnimation = () => {
        Animated.sequence([
            Animated.spring(scale, {
                toValue: 1,
                friction: 5,
                useNativeDriver: false
            }),
            Animated.spring(width, {
                toValue: 1,
                friction: 8,
                useNativeDriver: false
            })
        ]).start()
    }

    const endAnimation = () => {
        Animated.sequence([
            Animated.delay(1500),
            Animated.spring(width, {
                toValue: 0,
                friction: 8,
                useNativeDriver: false
            }),
            Animated.spring(scale, {
                toValue: 0,
                friction: !online ? 5 : 8,
                useNativeDriver: false
            }),
        ]).start()
    }

    const handleAnimated = () => {
        if(!online) startAnimation()
        else endAnimation()
    }

    useEffect(() => {
        if(cuenta !== 0) handleAnimated()
        dispatch(setCuenta(cuenta + 1))
    }, [online])

    const animatedImage = {
        transform: [
            {
                scale: scale
            }
        ]
    }

    const animatedWidth = {
        width: width.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
            extrapolate: 'clamp'
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.content}>

                <Animated.View style={[styles.imageContainer, animatedImage]}>
                    <Image 
                        source={require('../../assets/wifi.png')}
                        style={{width: 30, height: 30}}
                        resizeMode={'contain'}
                    />
                    <View style={{width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: online ? ok : error, borderRadius: 30, borderWidth: 2, borderColor: '#f1f1f1', position: 'absolute', bottom: 2, right: 4}}>
                        <Animated.Image 
                            source={!online ? require('../../assets/error.png') : require('../../assets/ok.png')}
                            style={{width: 8, height: 8, opacity: width}}
                            resizeMode={'contain'}
                        />
                    </View>
                </Animated.View>

                <Animated.View style={[{height: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: 40, borderWidth: 1, borderColor: width.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['rgba(255,255,255,0)', 'rgba(218,218,218,1)'],
                    extrapolate: 'clamp'
                }), overflow: 'hidden'}, animatedWidth]}>
                    <Text style={{fontSize: 15, fontWeight: '300', color: '#383838'}}>{online ? 'Se ha restablecido la conexión' : 'Sin conexión a internet'}</Text>
                </Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        zIndex: 10,
    },
    content: {
        height: 37,
        width: 325,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    imageContainer: {
        height: '100%',
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        position: 'absolute',
        left: -2,
        zIndex: 10,
        borderWidth: 1,
        borderColor: '#dadada'
    }
})