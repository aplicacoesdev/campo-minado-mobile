import { StyleSheet, View, Alert } from 'react-native'
import React, { useState } from 'react'
import params from '../functions/params'
import MineField from '../components/MineField'
import Header from '../components/Header'
import LevelSelection from '../components/LevelSelection'
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed
} from '../functions/functions'

type StateProps = {
  board: any,
  won?: boolean,
  lost?: boolean,
  showLevelSelection: boolean,
}

export default function HomeScreen() {
  const [state, setState] = useState<StateProps>(createState());

  function minesAmount() {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  function createState() {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  function onOpenField(row: any, column: any) {
    const board = cloneBoard(state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeeeeu!', 'Que buuuurro!')
    }

    if (won) {
      Alert.alert('Parabéns', 'Você Venceu!')
    }

    setState({ board, lost, won, showLevelSelection: false })
  }

  function onSelectField(row: any, column: any) {
    const board = cloneBoard(state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if (won) {
      Alert.alert('Parabéns', 'Você Venceu!')
    }

    setState({ board, won, showLevelSelection: false })
  }

  function onLevelSelected(level: any) {
    params.difficultLevel = level
    setState(createState())
  }


  return (
    <View style={styles.container}>
      <LevelSelection isVisible={state.showLevelSelection}
        onLevelSelected={onLevelSelected}
        onCancel={() => setState(state => ({ ...state, showLevelSelection: false }))} />
      <Header flagsLeft={minesAmount() - flagsUsed(state.board)}
        onNewGame={() => setState({ ...createState(), showLevelSelection: true })}
        onFlagPress={() => setState(state => ({ ...state, showLevelSelection: true }))} />
      <View style={styles.board}>
        <MineField board={state.board}
          onOpenField={onOpenField}
          onSelectField={onSelectField} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  },
});
