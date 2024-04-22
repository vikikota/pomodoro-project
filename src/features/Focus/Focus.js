import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../../utils/colors';
import { RoundedButton } from '../../components/RoundedButton';
import { spacing } from '../../utils/sizes';

export const Focus = ({ addSubject }) => {
    const [subject, setSubject] = useState(null);
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setSubject}
                    label='What would you like to focus on?'
                />
                <RoundedButton
                    title='+'
                    size={50}
                    onPress={() => addSubject(subject)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.2,
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'top',
        alignItems: 'center',
        padding: spacing.lg,
    },
    text: {
        color: colors.blue,
    },
    textInput: {
        flex: 1,
        marginRight: spacing.md,
    },
});
