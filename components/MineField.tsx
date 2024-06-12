import React from 'react'
import { View, StyleSheet } from 'react-native'
import Field from './Field'

type MineFieldProps = {
    board: any,
    onOpenField: (label: number, label2: number) => void,
    onSelectField: (label: number, label2: number) => void,
}

export default function MineField(props: MineFieldProps) {
    const rows = props.board.map((row: any, r: number) => {
        const columns = row.map((field: any, c: number) => {
            return <Field {...field} key={c}
                onOpen={() => props.onOpenField(r, c)}
                onSelect={(e: any) => props.onSelectField(r, c)} />
        })
        return <View key={r}
            style={{ flexDirection: 'row' }}>{columns}</View>
    })
    return <View style={styles.container}>{rows}</View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
    }
})