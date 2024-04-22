import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { ProgressBar } from 'react-native-paper';
import { Countdown } from '../../components/Countdown';
import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';
import { colors } from '../../utils/colors';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [1 * ONE_SECOND_IN_MS, 1 * ONE_SECOND_IN_MS];

export const Timer = ({ focusSubject, clearSubject }) => {
    useKeepAwake();
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [minutes, setMinutes] = useState(0.1);

    const onEnd = (reset) => {
        Vibration.vibrate(PATTERN);
        setIsStarted(false);
        setProgress(1);
        reset();
    };

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown
                    minutes={minutes}
                    isPaused={!isStarted}
                    onProgress={setProgress}
                    onEnd={onEnd}
                />
                <View style={{ paddingTop: spacing.xxl }}>
                    <Text style={styles.title}>Focusing on:</Text>
                    <Text style={styles.task}>{focusSubject}</Text>
                </View>
            </View>
            <View style={{ paddingTop: spacing.sm }}>
                <ProgressBar
                    progress={progress}
                    color='yellow'
                    style={{ height: 5 }}
                />
            </View>
            <View style={styles.timingWrapper}>
                <Timing onChangeTime={setMinutes} />
            </View>
            <View style={styles.buttonWrapper}>
                {!isStarted ? (
                    <RoundedButton
                        title='start'
                        onPress={() => setIsStarted(true)}
                    />
                ) : (
                    <RoundedButton
                        title='stop'
                        onPress={() => setIsStarted(false)}
                    />
                )}
            </View>
            <View style={styles.clearSubjectWrapper}>
                <RoundedButton size={50} title='-' onPress={clearSubject} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    countdown: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonWrapper: {
        flex: 0.3,
        flexDirection: 'row',
        padding: spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timingWrapper: {
        flex: 0.1,
        paddingTop: spacing.xxl,
    },
    clearSubjectWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    task: {
        color: colors.white,
        fontSize: fontSizes.lg,
        textAlign: 'center',
    },
});
